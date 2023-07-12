import 'package:flutter/material.dart';
import 'package:library_management/global_variable.dart';
import 'package:library_management/services/auth_service.dart';

import 'package:provider/provider.dart';

import '../provider/user_provider.dart';

class Profile extends StatelessWidget {
  static const String routeName = "/profile";

  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<userProvider>(context).user;
    AuthService service = AuthService();
    return Scaffold(
      body: Container(
        color: GlobalVariable.dark,
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircleAvatar(
                radius: 48,
                backgroundImage: user.profilePicture.isEmpty
                    ? const NetworkImage(
                        "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png")
                    : NetworkImage(user.profilePicture),
              ),
              const SizedBox(
                height: 30,
              ),
              Text(
                "Username",
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                user.username,
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 30,
              ),
              Text(
                "Email",
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                user.email,
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 30,
              ),
              Text(
                "Contact",
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 10,
              ),
              Text(
                user.contact,
                style: TextStyle(color: GlobalVariable.whiteRep),
              ),
              const SizedBox(
                height: 30,
              ),
              ElevatedButton(
                onPressed: () {
                  service.logOut(context);
                },
                style: ButtonStyle(
                  textStyle: MaterialStateProperty.all(
                    const TextStyle(
                      fontSize: 18,
                    ),
                  ),
                  backgroundColor:
                      MaterialStateProperty.all(GlobalVariable.light),
                  overlayColor: MaterialStateProperty.all(GlobalVariable.red),
                  minimumSize: MaterialStateProperty.all(const Size(200, 40)),
                ),
                child: const Text("Logout"),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
