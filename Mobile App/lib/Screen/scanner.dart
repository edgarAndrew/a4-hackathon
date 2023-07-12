import 'package:flutter/material.dart';

import 'package:library_management/services/scanner_service.dart';
import 'package:lottie/lottie.dart';

import '../global_variable.dart';

class Scanner extends StatefulWidget {
  const Scanner({super.key});

  @override
  State<Scanner> createState() => _ScannerState();
}

class _ScannerState extends State<Scanner> {
  ScannerService scannerService = ScannerService();

  void callBack() {
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    scannerService.scanBarCode(context, callBack);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariable.whiteRep,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          if (scannerService.result == "-1") ...[
            Column(
              children: [
                const SizedBox(
                  height: 20,
                ),
                Container(
                    padding: const EdgeInsets.only(left: 50),
                    width: double.infinity,
                    height: 400,
                    color: GlobalVariable.whiteRep,
                    child: Lottie.asset("assets/cat.json")),
                Center(
                  child: ElevatedButton(
                      style: ButtonStyle(
                        padding: MaterialStateProperty.all(
                            const EdgeInsets.only(top: 20, bottom: 20)),
                        textStyle: MaterialStateProperty.all(
                          const TextStyle(fontSize: 18),
                        ),
                        backgroundColor:
                            MaterialStateProperty.all(GlobalVariable.dark),
                        overlayColor:
                            MaterialStateProperty.all(GlobalVariable.light),
                        minimumSize:
                            MaterialStateProperty.all(const Size(200, 40)),
                      ),
                      onPressed: () {
                        scannerService.scanBarCode(context, callBack);
                      },
                      child: const Text("Retry")),
                ),
              ],
            ),
          ] else if (scannerService.result == null) ...[
            const Center(
              child: Text(""),
            ),
          ] else ...[
            Card(
              color: GlobalVariable.dark,
              margin: const EdgeInsets.only(left: 20, right: 20),
              child: SizedBox(
                width: double.infinity,
                height: 250,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text(
                      scannerService.scannedBook!.title!,
                      style: TextStyle(color: GlobalVariable.whiteRep),
                    ),
                    Text(
                      scannerService.scannedBook!.description!,
                      style: TextStyle(color: GlobalVariable.whiteRep),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        setState(() {
                          scannerService.lendBook(context);
                        });
                      },
                      style: ButtonStyle(
                        padding: MaterialStateProperty.all(
                            const EdgeInsets.only(top: 10, bottom: 10)),
                        textStyle: MaterialStateProperty.all(
                          const TextStyle(
                            fontSize: 18,
                          ),
                        ),
                        backgroundColor:
                            MaterialStateProperty.all(GlobalVariable.light),
                        overlayColor:
                            MaterialStateProperty.all(GlobalVariable.whiteRep),
                        minimumSize:
                            MaterialStateProperty.all(const Size(200, 40)),
                      ),
                      child: const Text("Borrow"),
                    ),
                  ],
                ),
              ),
            ),
          ]
        ],
      ),
    );
  }
}
