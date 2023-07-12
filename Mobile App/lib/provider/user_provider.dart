import 'package:flutter/material.dart';
import 'package:library_management/models/book.dart';

import '../models/user.dart';

// ignore: camel_case_types
class userProvider extends ChangeNotifier {
  User _user = User(
      username: '',
      email: '',
      contact: '',
      profilePicture: '',
      sId: '',
      history: []);

  User get user => _user;

  void setUser(String user, List<Book> history) {
    _user = User.fromJson(user);
    _user.history = history;
    notifyListeners();
  }
}
