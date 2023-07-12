import 'package:flutter/material.dart';

import 'global_variable.dart';

void showSnackbar(BuildContext context, String text) {
  ScaffoldMessenger.of(context).showSnackBar(SnackBar(
    content: Text(text),
  ));
}

void showLoader(BuildContext context) {
  showDialog(
      barrierDismissible: false,
      context: context,
      builder: (context) {
        return Center(
          child: CircularProgressIndicator(
            color: GlobalVariable.dark,
          ),
        );
      });
}

void hideLoader(BuildContext context) {
  Navigator.of(context).pop();
}
