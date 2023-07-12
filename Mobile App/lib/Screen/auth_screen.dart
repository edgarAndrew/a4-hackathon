import 'package:flutter/material.dart';
import '../services/auth_service.dart';
import '../widgets/custom_textfield.dart';

class AuthScreen extends StatefulWidget {
  static const String routeName = "/auth";
  const AuthScreen({super.key});

  @override
  State<AuthScreen> createState() => _AuthScreenState();
}

class _AuthScreenState extends State<AuthScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  final AuthService authService = AuthService();

  final _signInFormKey = GlobalKey<FormState>();

  void signInUser() {
    authService.signInUser(
      context: context,
      email: _emailController.text,
      password: _passwordController.text,
    );
  }

  @override
  void initState() {
    super.initState();
    authService.validate(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          padding: const EdgeInsets.all(8),
          color: Colors.white,
          child: Form(
            key: _signInFormKey,
            child: Column(
              children: [
                const SizedBox(
                  height: 10,
                ),
                CustomTextField(
                  controller: _emailController,
                  hintText: "Email",
                  showText: true,
                ),
                const SizedBox(
                  height: 10,
                ),
                CustomTextField(
                  controller: _passwordController,
                  hintText: "Password",
                  showText: false,
                ),
                const SizedBox(
                  height: 10,
                ),
                ElevatedButton(
                  onPressed: () {
                    if (_signInFormKey.currentState!.validate()) {
                      signInUser();
                    }
                  },
                  child: const Text("login"),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
