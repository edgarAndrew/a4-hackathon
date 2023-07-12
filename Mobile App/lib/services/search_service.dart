import 'dart:convert';
import 'dart:developer';

import 'package:http/http.dart';

import '../global_variable.dart';
import '../models/book.dart';

class SearchService {
  List<Book> suggestions = [];
  List<Book> allBooks = [];

// Get all the books
  getAllBooks(Function func) async {
    var response = await get(
      Uri.parse(
          "${GlobalVariable.URL}${GlobalVariable.booksPORT}/books/api/v1/book"),
    );

    List<Book> books = [];
    for (var i = 0; i < jsonDecode(response.body)['books'].length; i++) {
      books.add(Book.fromJson(jsonDecode(response.body)['books'][i]));
    }
    log(response.body);

    suggestions = [...books];
    allBooks = [...books];

    func();
  }

// TextBox Change listener
  change(String s, Function func) {
    suggestions.clear();

    for (var i = 0; i < allBooks.length; i++) {
      if (allBooks[i].author!.toLowerCase().contains(s) ||
          allBooks[i].title!.toLowerCase().contains(s)) {
        suggestions.add(allBooks[i]);
      }
    }

    if (suggestions.isEmpty) {
      suggestions
          .add(Book(title: "No Book found", description: "", author: "",quantity: 0));
    }

    func();
  }
}
