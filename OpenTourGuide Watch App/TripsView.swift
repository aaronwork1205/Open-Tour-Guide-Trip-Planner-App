//
//  TripsView.swift
//  OpenTourGuide Watch App
//
//  Created by Brandon Yang on 11/24/23.
//

import SwiftUI

struct TripsView: View {
    @State var tiles = [TileData]()
    @Binding var authInfo: SignInResponse

    var body: some View {
        NavigationView {
            TabView {
                ForEach(tiles, id: \.title) { tile in
                    NavigationLink(destination: EventView(tripId: tile.title, authInfo: authInfo)) {
                        TileView(data: tile)
                    }
                    .buttonStyle(PlainButtonStyle())
                }
            }
            .frame(height: 200)
            .navigationBarTitle("Trips")
        }
        .onAppear {
            DataService().fetchData(authInfo: authInfo) { fetchedTiles in
                self.tiles = fetchedTiles
            }
        }
    }
}

struct TripsAPIResponse: Decodable {
    var documents: [Document]
}

struct APIResponse: Decodable {
    var documents: [Document]
}

struct Document: Decodable {
    var name: String
    var fields: Fields
    var createTime: String
    var updateTime: String
}

struct Fields: Decodable {
    var startDate: StringValue
    var destination: StringValue
    var endDate: StringValue
}

struct StringValue: Decodable {
    var stringValue: String
}

extension Fields {
    enum CodingKeys: String, CodingKey {
        case startDate = "startDate"
        case destination = "destination"
        case endDate = "endDate"
    }
}

extension StringValue {
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        stringValue = try container.decode(String.self, forKey: .stringValue)
    }

    enum CodingKeys: String, CodingKey {
        case stringValue
    }
}


class DataService {
    func fetchData(authInfo: SignInResponse, completion: @escaping ([TileData]) -> Void) {
        let username = authInfo.email
        guard let url = URL(string: "https://firestore.googleapis.com/v1/projects/opentourguide-d16ef/databases/(default)/documents/users/\(username)/trips") else {
            print("Invalid URL")
            return
        }
        
        let bearerToken = authInfo.idToken
        var request = URLRequest(url: url)
        request.setValue("Bearer \(bearerToken)",forHTTPHeaderField: "Authorization")
        request.httpMethod = "GET"
            

        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("Error fetching data: \(error?.localizedDescription ?? "Unknown error")")
                return
            }

            if let decodedResponse = try? JSONDecoder().decode(TripsAPIResponse.self, from: data) {
                var trips: [TileData] = []
                for doc in decodedResponse.documents {
                    var trip = TileData(title:doc.fields.destination.stringValue, startDate: doc.fields.startDate.stringValue, endDate: doc.fields.endDate.stringValue)
                    trips.append(trip)
                    
                }
                DispatchQueue.main.async {
                    completion(trips)
                }
            } else {
                print("Invalid response from server")
            }
        }
        task.resume()
    }
}

struct TileData: Decodable {
    var title: String
    var startDate: String
    var endDate: String
}

struct TileView: View {
    let titleFont = Font.system(size: 20, weight: .bold)
    var data: TileData

    var body: some View {
        VStack {
            Text(data.title)
                .font(titleFont)
            Text(data.startDate)
                .font(.subheadline)
            Text(data.endDate)
                .font(.subheadline)
        }
        .frame(width: 150, height: 130)
        .background(Color.blue)
        .cornerRadius(10)
    }
}


struct Trip_Previews: PreviewProvider {
    @State static var authInfo = SignInResponse(idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhM2JkODk4ZGE1MGE4OWViOWUxY2YwYjdhN2VmZTM1OTNkNDEwNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3BlbnRvdXJndWlkZS1kMTZlZiIsImF1ZCI6Im9wZW50b3VyZ3VpZGUtZDE2ZWYiLCJhdXRoX3RpbWUiOjE3MDIxMTMwMjQsInVzZXJfaWQiOiJzZVczRXBscjFrV0RCNlhkTlltSlNQVDJDZ3cyIiwic3ViIjoic2VXM0VwbHIxa1dEQjZYZE5ZbUpTUFQyQ2d3MiIsImlhdCI6MTcwMjExMzAyNCwiZXhwIjoxNzAyMTE2NjI0LCJlbWFpbCI6InBweWFuZzIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBweWFuZzIwMDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Sko4aBBp-HwKykvw1oLSPv62d6H3GGsqClVccOE3dS9Mm_Cq6Wj6KL04wV0kznWc8E5KnRjBODQJDW94Dihna6SKJd27NGeHDSQ-CTgPtENySwF-4Hvka5bnZhZtfPb9IlIM_DOXF5paAbyDXj8ZpaZzkVWLkeMc7NEM1NpA3NlhVeLCNqorUyouporcjgBRmPHY9PR1bsqDZ4Iyxy1YMIF8XzbQ4Rbdw89fG3Nca5mifBPYgfi-218FCUMQVTWp9i3yrvaNLmuahxMUXLh9i-8Vx7RBdvRSoAmrqdw-Xe8h4QzENtVclHVPqI-Rcy5pZdKSnPnPYOlFDwf2yU7l1w", email: "bixingjian19@gmail.com", refreshToken: "", expiresIn: "")
    
    static var previews: some View {
        TripsView(authInfo: $authInfo)
    }
}
