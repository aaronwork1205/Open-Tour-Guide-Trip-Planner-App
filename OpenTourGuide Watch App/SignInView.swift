//
//  SignInView.swift
//  OpenTourGuide Watch App
//
//  Created by Brandon Yang on 11/24/23.
//

import Foundation
import SwiftUI


public struct SignInResponse: Codable {
    var idToken: String
    var email: String
    var refreshToken: String
    var expiresIn: String
    
    static let empty = SignInResponse(idToken: "", email: "", refreshToken: "", expiresIn: "")
}

struct SignInView: View {
    @Binding var authInfo: SignInResponse
    @State private var email: String = ""
    @State private var password: String = ""

    var body: some View {
        VStack {
            TextField("Email", text: $email)

            SecureField("Password", text: $password)
            
            Button("Sign In") {
                signIn()
            }
        }
    }

    private func signIn() {
        print("HI")
        guard let url = URL(string: "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBV9pZrp3z7g9Lzho-_ZZGqEScf32J170o") else { return }

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        let body: [String: Any] = [
            "email": "ppyang2002@gmail.com",
            "password": "Hello123",
            "returnSecureToken": true
        ]

        request.httpBody = try? JSONSerialization.data(withJSONObject: body, options: [])

        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                print("Error: \(error)")
                return
            }
            guard let data = data else { return }
            DispatchQueue.main.async {
                do {
                    let decodedUsers = try JSONDecoder().decode(SignInResponse.self, from: data)
                    authInfo = decodedUsers
                    print(decodedUsers)
                } catch let error {
                    print("Error decoding: ", error)
                }
            }
        }.resume()
    }
}

struct SignIn_Previews: PreviewProvider {
    @State static var authInfo = SignInResponse.empty
    static var previews: some View {
        SignInView(authInfo: $authInfo)
    }
}
