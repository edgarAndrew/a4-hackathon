import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:library_management/Screen/auth_screen.dart';
import 'package:library_management/models/book.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../Screen/bottom_bar.dart';
import '../error_handling.dart';
import '../global_variable.dart';
import '../provider/user_provider.dart';
import '../utils.dart';

class AuthService {


// SignIn User
  void signInUser(
      {required BuildContext context,
      required String email,
      required String password}) async {
    showLoader(context);

    try {
      var response;

      try {
        response = await post(
          Uri.parse(
              '${GlobalVariable.URL}${GlobalVariable.lendingPORT}/lending/api/v1/auth/login'),
          body: jsonEncode({"email": email, "password": password}),
          headers: <String, String>{'Content-Type': 'application/json'},
        );
      } catch (e) {
        response = jsonEncode({"message": e});
      }

      if (!context.mounted) {
        log("Auth-Screen not mounted");
        return;
      }

      httpErrorHandle(
          response: response,
          context: context,
          onSuccess: () async {
            try {
              Map<String, String> headers = {};
              String? rawCookie = response.headers['set-cookie']!;

              if (rawCookie != null) {
                int index = rawCookie.indexOf(';');
                headers['cookie'] =
                    (index == -1) ? rawCookie : rawCookie.substring(0, index);
              }

              SharedPreferences prefs = await SharedPreferences.getInstance();
              await prefs.setString("cookie", headers['cookie']!);
              getUserData(context, headers['cookie']!);
            } catch (e) {
              print(e.toString());
            }
          });
    } catch (e) {
      showSnackbar(context, e.toString());
    }
  }

//  Get Current User Data
  void getUserData(BuildContext context, String token) async {
    Map<String, String> headers = {};
    headers['cookie'] = token;

    var verifyCookie = await get(
      Uri.parse(
          '${GlobalVariable.URL}${GlobalVariable.lendingPORT}/lending/api/v1/auth/verify-jwt'),
      headers: headers,
    );

    var historyResponse = await get(
      Uri.parse(
          '${GlobalVariable.URL}${GlobalVariable.lendingPORT}/lending/api/v2/books-taken/${jsonDecode(verifyCookie.body)['user']['_id']}?status=returned&status=issued'),
      headers: headers,
    );

    List<Book> historyStudent = [];
    for (var i = 0; i < jsonDecode(historyResponse.body)['books'].length; i++) {
      historyStudent
          .add(Book.fromJson(jsonDecode(historyResponse.body)['books'][i]));
    }
    if (!context.mounted) {
      log("Auth-Screen not mounted");
      return;
    }

    hideLoader(context);
    Provider.of<userProvider>(context, listen: false).setUser(
        jsonEncode(jsonDecode(verifyCookie.body)['user']), historyStudent);

    showSnackbar(context, "Signed In");
    Navigator.pushNamedAndRemoveUntil(
        context, BottomBar.routeName, (route) => false);
  }

// LogOut User
  void logOut(BuildContext context) async {
    SharedPreferences pref = await SharedPreferences.getInstance();
    String? token = pref.getString('cookie');
    Map<String, String> headers = {};
    headers['cookie'] = token!;

    showLoader(context);

    await get(
      Uri.parse(
          '${GlobalVariable.URL}${GlobalVariable.lendingPORT}/lending/api/v1/auth/logout'),
      headers: headers,
    );

    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.clear();
    if (!context.mounted) {
      log("Auth-Screen not mounted");
      return;
    }

    hideLoader(context);

    Navigator.pushNamedAndRemoveUntil(
        context, AuthScreen.routeName, (route) => false);
  }

// Validate Token and Get data
  void validate(BuildContext context) async {
    String? token;
    SharedPreferences pref = await SharedPreferences.getInstance();
    token = pref.getString('cookie');

    if (!context.mounted) {
      log("Auth-Screen not mounted");
      return;
    }

    if (token != null) {
      showLoader(context);

      getUserData(context, token);
      hideLoader(context);
    }
  }
}
