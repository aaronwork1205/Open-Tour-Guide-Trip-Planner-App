//
//  EventView.swift
//  OpenTourGuide Watch App
//
//  Created by Brandon Yang on 11/24/23.
//

import SwiftUI
import MapKit

struct EventView: View {
    @State var tripId: String
    @State var authInfo: SignInResponse
    @State private var isNavigationActive = false
    @State private var eventData: [EventData] = []
    private var groupedEvents: [String: [EventData]] {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")

        return Dictionary(grouping: eventData) { event in
            let date = dateFormatter.date(from: String(event.dateTime.split(separator: " ")[0])) ?? Date()
            return dateFormatter.string(from: date)
        }
    }
    
    private func openInMaps(latitude: CLLocationDegrees, longitude: CLLocationDegrees) {
            let coordinate = CLLocationCoordinate2DMake(latitude, longitude)
            let mapItem = MKMapItem(placemark: MKPlacemark(coordinate: coordinate, addressDictionary:nil))
            mapItem.name = "Target Location"
            mapItem.openInMaps(launchOptions: [MKLaunchOptionsDirectionsModeKey : MKLaunchOptionsDirectionsModeWalking])
        }

    var body: some View {
        NavigationView {
            List {
                NavigationLink(destination: CollaboratorsListView(tripId: tripId, authInfo: authInfo), isActive: $isNavigationActive) {
                    Button("View Collaborators") {
                        isNavigationActive = true
                    }
                    .frame(maxWidth: .infinity)
                }
                .foregroundColor(Color.white)
                .cornerRadius(8)
                ForEach(groupedEvents.keys.sorted(), id: \.self) { date in
                    Section(header: Text(date)) {
                        
                        ForEach(groupedEvents[date] ?? [], id: \.name) { event in
                            VStack(alignment: .leading) {
                                let time = String(event.dateTime.suffix(8))
                                Text(event.detailedName)
                                    .font(.headline)
                                Text("\(time)")
                                    .font(.subheadline)
                            }
                            .onTapGesture {
                                let latitude = event.coords.arrayValue.values[0].doubleValue
                                let longitude = event.coords.arrayValue.values[1].doubleValue
                                openInMaps(latitude: latitude, longitude: longitude)
                            }
                        }
                    }
                }
            }
        }
        .navigationBarTitle("Events")
        .onAppear {
            let dataService = EventsDataService()
            dataService.fetchData(authInfo: authInfo, tripId: tripId) { events in
                self.eventData = events
            }
        }
    }
}

class EventsDataService {
    func fetchData(authInfo: SignInResponse, tripId: String, completion: @escaping ([EventData]) -> Void) {
        guard let url = URL(string: "https://firestore.googleapis.com/v1/projects/opentourguide-d16ef/databases/(default)/documents/trips/\(tripId)/events") else {
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

            if let decodedResponse = try? JSONDecoder().decode(EventsAPIResponse.self, from: data) {
                var events: [EventData] = []
                for doc in decodedResponse.documents {
                    let arr = doc.name.components(separatedBy: "/")
                    let name = arr[arr.count - 1]
                    let event = EventData(name:name,detailedName: doc.fields.detailedName.stringValue, coords:doc.fields.coords, dateTime: doc.fields.dateTime.stringValue)
                    events.append(event)
                    events = self.sortEventsByDateTime(events: events)
                }
                DispatchQueue.main.async {
                    completion(events)
                }
            } else {
                print("Invalid response from server")
            }
        }
        task.resume()
    }
    
    func sortEventsByDateTime(events: [EventData]) -> [EventData] {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd hh:mm a"
        dateFormatter.locale = Locale(identifier: "en_US_POSIX")

        return events.sorted { (event1, event2) -> Bool in
            guard let date1 = dateFormatter.date(from: event1.dateTime),
                  let date2 = dateFormatter.date(from: event2.dateTime) else {
                return false
            }
            return date1 < date2
        }
    }
}

struct EventData {
    var name: String
    var detailedName: String
    var coords: Coords
    var dateTime: String
}

struct EventsAPIResponse: Decodable {
    var documents: [EventsDocument]
}

struct EventsDocument: Decodable {
    var name: String
    var fields: EventFields
    var createTime: String
    var updateTime: String
}

struct EventFields: Decodable {
    var detailedName: EventsStringValue
    var dateTime: EventsStringValue
    var coords: Coords
}

struct EventsStringValue: Decodable {
    var stringValue: String
}

struct Coords: Decodable {
    var arrayValue: ArrayValue
}

struct ArrayValue: Decodable {
    var values: [DoubleValue]
}

struct DoubleValue: Decodable {
    var doubleValue: Double
}

struct Event_Preview: PreviewProvider {
    @State static var authInfo = SignInResponse(idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhM2JkODk4ZGE1MGE4OWViOWUxY2YwYjdhN2VmZTM1OTNkNDEwNjgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb3BlbnRvdXJndWlkZS1kMTZlZiIsImF1ZCI6Im9wZW50b3VyZ3VpZGUtZDE2ZWYiLCJhdXRoX3RpbWUiOjE3MDIxMTMwMjQsInVzZXJfaWQiOiJzZVczRXBscjFrV0RCNlhkTlltSlNQVDJDZ3cyIiwic3ViIjoic2VXM0VwbHIxa1dEQjZYZE5ZbUpTUFQyQ2d3MiIsImlhdCI6MTcwMjExMzAyNCwiZXhwIjoxNzAyMTE2NjI0LCJlbWFpbCI6InBweWFuZzIwMDJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInBweWFuZzIwMDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Sko4aBBp-HwKykvw1oLSPv62d6H3GGsqClVccOE3dS9Mm_Cq6Wj6KL04wV0kznWc8E5KnRjBODQJDW94Dihna6SKJd27NGeHDSQ-CTgPtENySwF-4Hvka5bnZhZtfPb9IlIM_DOXF5paAbyDXj8ZpaZzkVWLkeMc7NEM1NpA3NlhVeLCNqorUyouporcjgBRmPHY9PR1bsqDZ4Iyxy1YMIF8XzbQ4Rbdw89fG3Nca5mifBPYgfi-218FCUMQVTWp9i3yrvaNLmuahxMUXLh9i-8Vx7RBdvRSoAmrqdw-Xe8h4QzENtVclHVPqI-Rcy5pZdKSnPnPYOlFDwf2yU7l1w", email: "bixingjian19@gmail.com", refreshToken: "", expiresIn: "")
    
    static var previews: some View {
        EventView(tripId: "Berlin", authInfo: authInfo)
    }
}
