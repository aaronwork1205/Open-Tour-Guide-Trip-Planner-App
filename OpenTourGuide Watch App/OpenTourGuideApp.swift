//
//  OpenTourGuideApp.swift
//  OpenTourGuide Watch App
//
//  Created by Brandon Yang on 11/24/23.
//

import SwiftUI

@main
struct OpenTourGuide_Watch_AppApp: App {
    @State private var authInfo: SignInResponse = SignInResponse.empty
    
    var body: some Scene {
        WindowGroup {
            if authInfo.email == "" {
                SignInView(authInfo: $authInfo)
            } else {
                TripsView(authInfo: $authInfo)
            }
        }
    }
}


