import 'dart:convert';

class Book {
  String? sId;
  String? title;
  String? isbn;
  String? author;
  String? description;
  int? quantity;
  String? createdAt;
  String? updatedAt;
  String? status;
  String? issuedDate;
  String? dueDate;
  String? isDue;
  int? iV;

  Book(
      {this.sId,
      this.title,
      this.isbn,
      this.author,
      this.description,
      this.quantity,
      this.createdAt,
      this.updatedAt,
      this.status,
      this.issuedDate,
      this.dueDate,
      this.isDue,
      this.iV});

  Book.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    title = json['title'];
    isbn = json['isbn'];
    author = json['author'];
    description = json['description'];
    quantity = json['quantity'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    issuedDate = json['issueDate'];
    dueDate = json['dueDate'];
    status = json['status'];
    isDue = json['isDue'];
    iV = json['__v'];
  }

  String toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['title'] = title;
    data['isbn'] = isbn;
    data['author'] = author;
    data['description'] = description;
    data['quantity'] = quantity;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['status'] = status;
    data['issueDate'] = issuedDate;
    data['dueDate'] = dueDate;
    data['isDue'] = isDue;
    data['__v'] = iV;
    return jsonEncode(data);
  }
}
