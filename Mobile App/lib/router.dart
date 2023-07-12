import 'package:flutter/material.dart';
import 'package:library_management/Screen/bottom_bar.dart';
import 'package:library_management/Screen/profile_screen.dart';

import 'Screen/auth_screen.dart';
import 'Screen/search.dart';

Route<dynamic> generateRoute(RouteSettings routeSettings) {
  switch (routeSettings.name) {
    case AuthScreen.routeName:
      return MaterialPageRoute(
        builder: (_) => const AuthScreen(),
        settings: routeSettings,
      );
    case BottomBar.routeName:
      return MaterialPageRoute(
        builder: (_) => BottomBar(0),
        settings: routeSettings,
      );
    case Search.routeName:
      return MaterialPageRoute(
        builder: (_) => BottomBar(1),
        settings: routeSettings,
      );
    case Profile.routeName:
      return MaterialPageRoute(
        builder: (_) => const Profile(),
        settings: routeSettings,
      );
    default:
      return MaterialPageRoute(
        builder: (_) => const Scaffold(
          body: Center(
            child: Text("No page found"),
          ),
        ),
        settings: routeSettings,
      );
  }
}
