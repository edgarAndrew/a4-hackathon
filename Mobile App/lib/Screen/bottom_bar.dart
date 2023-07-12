import 'package:flutter/material.dart';

import 'package:library_management/Screen/history_screen.dart';
import 'package:library_management/Screen/profile_screen.dart';
import 'package:library_management/Screen/scanner.dart';
import 'package:library_management/Screen/search.dart';
import 'package:library_management/global_variable.dart';

// ignore: must_be_immutable
class BottomBar extends StatefulWidget {
  static const String routeName = '/home';
  int page;
  BottomBar(this.page, {super.key});

  @override
  State<BottomBar> createState() => _BottomBarState();
}

class _BottomBarState extends State<BottomBar> {
  int _page = 0;
  @override
  void initState() {
    super.initState();

    _page = widget.page;
  }

  double bottomBarWidth = 42;
  double bottomBarBorderWidth = 5;

  List<Widget> pages = [
    const HistoryScreen(),
    const Search(),
    const Scanner(),
  ];

  void updatePage(int page) {
    setState(() {
      _page = page;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: GlobalVariable.dark,
        iconTheme: IconThemeData(color: GlobalVariable.whiteRep, size: 28),
      ),
      drawer: const Drawer(
        child: Profile(),
      ),
      body: SafeArea(
        child: Stack(children: [
          pages[_page],
        ]),
      ),
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.all(0),
        child: BottomNavigationBar(
          backgroundColor: GlobalVariable.light,
          currentIndex: _page,
          selectedItemColor: GlobalVariable.dark,
          unselectedItemColor: GlobalVariable.whiteRep,
          iconSize: 28,
          onTap: updatePage,
          items: [
            // History
            BottomNavigationBarItem(
                icon: Container(
                  margin: const EdgeInsets.only(top: 10),
                  width: bottomBarWidth,
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: _page == 0
                            ? GlobalVariable.dark
                            : GlobalVariable.whiteRep,
                        width: bottomBarBorderWidth,
                      ),
                    ),
                  ),
                  child: const Icon(Icons.home_outlined),
                ),
                label: ''),
            // Search
            BottomNavigationBarItem(
                icon: Container(
                  width: bottomBarWidth,
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: _page == 1
                            ? GlobalVariable.dark
                            : GlobalVariable.whiteRep,
                        width: bottomBarBorderWidth,
                      ),
                    ),
                  ),
                  child: const Icon(Icons.search),
                ),
                label: ''),
            // Scan
            BottomNavigationBarItem(
                icon: Container(
                  width: bottomBarWidth,
                  decoration: BoxDecoration(
                    border: Border(
                      top: BorderSide(
                        color: _page == 2
                            ? GlobalVariable.dark
                            : GlobalVariable.whiteRep,
                        width: bottomBarBorderWidth,
                      ),
                    ),
                  ),
                  child: const Icon(Icons.qr_code),
                ),
                label: ''),
          ],
        ),
      ),
    );
  }
}
