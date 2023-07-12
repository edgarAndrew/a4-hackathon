import 'package:flutter/material.dart';
import 'package:library_management/provider/user_provider.dart';
import 'package:library_management/router.dart';
import 'package:provider/provider.dart';

import 'Screen/auth_screen.dart';

// Username : akash@codehomies.com    password:123456
// Username : akashcsanjeev@gmail.com   password:123456

void main() {
  runApp(MultiProvider(
    providers: [
      ChangeNotifierProvider(
        create: (context) => userProvider(),
      )
    ],
    child: const MyApp(),
  ));
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  @override
  void initState() {
    super.initState();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Library Management',
        theme: ThemeData(
            appBarTheme: const AppBarTheme(
              elevation: 0,
              iconTheme: IconThemeData(color: Colors.black),
            ),
            fontFamily: 'Oswald'),
        onGenerateRoute: (settings) => generateRoute(settings),
        home: const AuthScreen());
  }
}
