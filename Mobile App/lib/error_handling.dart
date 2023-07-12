import 'dart:convert';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:library_management/utils.dart';

void httpErrorHandle(
    {required Response response,
    required BuildContext context,
    required VoidCallback onSuccess}) {
  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      hideLoader(context);
      showSnackbar(context, jsonDecode(response.body)['msg']);
      log(response.body);
      break;
    case 401:
      hideLoader(context);
      showSnackbar(context, jsonDecode(response.body)['msg']);
      log(response.body);
      break;
    case 400:
      hideLoader(context);
      showSnackbar(context, jsonDecode(response.body)['error']);
      log(response.body);
      break;
    default:
      hideLoader(context);
      showSnackbar(context, response.body);
      log(response.body);
      break;
  }
}
