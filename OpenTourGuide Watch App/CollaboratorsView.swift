//
//  CollaboratorsView.swift
//  OpenTourGuide Watch App
//
//  Created by Brandon Yang on 12/9/23.
//

import SwiftUI

struct CollaboratorsListView: View {
    @State var tripId: String
    @State var authInfo: SignInResponse
    @State private var collaborators: [CollaboratorData] = []

    var body: some View {
        List {
            ForEach(collaborators) { collaborator in
                CollaboratorView(collaborator: collaborator)
            }
        }
        .onAppear {
            let dataService = CollaboratorsDataService()
            dataService.fetchData(authInfo: authInfo, tripId: tripId) { collaborator in
                self.collaborators = collaborator
            }
        }
    }
}

struct CollaboratorView: View {
    var collaborator: CollaboratorData

    var body: some View {
        HStack {
            AsyncImage(url: URL(string: collaborator.profileImage), content: { phase in
                if let image = phase.image {
                    image
                        .resizable()
                }
            })
                .frame(width: 50, height: 50)
                .clipShape(Circle())

            VStack(alignment: .leading) {
                Text(collaborator.name)
                    .font(.headline)
                Text(collaborator.email)
                    .font(.subheadline)
            }
        }
    }
}

class CollaboratorsDataService {
    func fetchData(authInfo: SignInResponse, tripId: String, completion: @escaping ([CollaboratorData]) -> Void) {
        guard let url = URL(string: "https://firestore.googleapis.com/v1/projects/opentourguide-d16ef/databases/(default)/documents/trips/\(tripId)/collaborators") else {
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

            if let decodedResponse = try? JSONDecoder().decode(CollaboratorsAPIResponse.self, from: data) {
                var collaborators: [CollaboratorData] = []
                for doc in decodedResponse.documents {
                    let arr = doc.name.components(separatedBy: "/")
                    let email = arr[arr.count - 1]
                    let collaborator = CollaboratorData(name:doc.fields.name.stringValue,email:email,profileImage:doc.fields.image.stringValue)
                    collaborators.append(collaborator)
                }
                DispatchQueue.main.async {
                    completion(collaborators)
                }
            } else {
                print("Invalid response from server")
            }
        }
        task.resume()
    }
}

struct CollaboratorData: Identifiable {
    let id = UUID()
    var name: String
    var email: String
    var profileImage: String
}

struct CollaboratorsAPIResponse: Decodable {
    var documents: [CollaboratorDocument]
}

struct CollaboratorDocument: Decodable {
    var name: String
    var fields: CollaboratorFields
    var createTime: String
    var updateTime: String
}

struct CollaboratorFields: Decodable {
    var name: FieldValue
    var image: FieldValue
    var access: FieldValue
}

struct FieldValue: Decodable {
    var stringValue: String
}

struct CollaboratorsListView_Previews: PreviewProvider {
    @State static var authInfo = SignInResponse(idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhM2JkODk4ZGE1MGE4OWViOWUxY2YwYjdhN2VmZTM1OTNkNDEwNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3BlbnRvdXJndWlkZS1kMTZlZiIsImF1ZCI6Im9wZW50b3VyZ3VpZGUtZDE2ZWYiLCJhdXRoX3RpbWUiOjE3MDIxMTMwMjQsInVzZXJfaWQiOiJzZVczRXBscjFrV0RCNlhkTlltSlNQVDJDZ3cyIiwic3ViIjoic2VXM0VwbHIxa1dEQjZYZE5ZbUpTUFQyQ2d3MiIsImlhdCI6MTcwMjExMzAyNCwiZXhwIjoxNzAyMTE2NjI0LCJlbWFpbCI6InBweWFuZzIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBweWFuZzIwMDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Sko4aBBp-HwKykvw1oLSPv62d6H3GGsqClVccOE3dS9Mm_Cq6Wj6KL04wV0kznWc8E5KnRjBODQJDW94Dihna6SKJd27NGeHDSQ-CTgPtENySwF-4Hvka5bnZhZtfPb9IlIM_DOXF5paAbyDXj8ZpaZzkVWLkeMc7NEM1NpA3NlhVeLCNqorUyouporcjgBRmPHY9PR1bsqDZ4Iyxy1YMIF8XzbQ4Rbdw89fG3Nca5mifBPYgfi-218FCUMQVTWp9i3yrvaNLmuahxMUXLh9i-8Vx7RBdvRSoAmrqdw-Xe8h4QzENtVclHVPqI-Rcy5pZdKSnPnPYOlFDwf2yU7l1w", email: "bixingjian19@gmail.com", refreshToken: "", expiresIn: "")
    
    static var previews: some View {
        CollaboratorsListView(tripId: "Berlin", authInfo: authInfo)
    }
}
