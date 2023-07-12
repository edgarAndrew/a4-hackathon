import 'dart:convert';

import 'book.dart';

class User {
  String username;
  String email;
  String contact;
  String profilePicture;
  String sId;
  List<Book>? history;

  User({
    required this.username,
    required this.email,
    required this.contact,
    required this.profilePicture,
    required this.sId,
    this.history,
  });

  factory User.fromMap(Map<String, dynamic> json) {
    return User(
      username: json['username'],
      email: json['email'],
      contact: json['contact'],
      profilePicture: json['profilePicture'],
      sId: json['_id'],
    );
  }

  factory User.fromJson(String source) => User.fromMap(json.decode(source));

  String toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['name'] = username;
    data['email'] = email;
    data['contact'] = contact;
    data['profilePicture'] = profilePicture;
    data['_id'] = sId;
    data['history'] = history;
    return jsonEncode(data);
  }
}
