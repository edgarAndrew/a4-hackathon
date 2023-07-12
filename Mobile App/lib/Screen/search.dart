import 'package:flutter/material.dart';
import 'package:library_management/services/search_service.dart';

import '../global_variable.dart';

class Search extends StatefulWidget {
  static const String routeName = '/search';
  const Search({super.key});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  SearchService searchService = SearchService();

  void callback() {
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    searchService.getAllBooks(callback);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalVariable.whiteRep,
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(20),
              child: TextField(
                onChanged: (string) {
                  searchService.change(string, callback);
                },
                decoration: InputDecoration(
                    hintText: "Search",
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: GlobalVariable.dark),
                    ),
                    border: OutlineInputBorder(
                      borderSide: BorderSide(color: GlobalVariable.dark),
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: GlobalVariable.dark),
                    )),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 20, left: 10, right: 10),
              width: double.infinity,
              height: MediaQuery.of(context).size.height - 300,
              child: ListView.separated(
                  itemBuilder: (context, index) {
                    return ListTile(
                      tileColor: GlobalVariable.dark,
                      title: Text(
                        searchService.suggestions[index].title!,
                        style: TextStyle(color: GlobalVariable.whiteRep),
                      ),
                      subtitle: Text(
                        searchService.suggestions[index].author!,
                        style: TextStyle(
                            color: GlobalVariable.whiteRep,
                            fontWeight: FontWeight.w100),
                      ),
                      trailing: Container(
                      width: 60,
                      color: GlobalVariable.dark,
                      padding: const EdgeInsets.only(right: 20,left:20,),
                      child:  searchService.suggestions[index].quantity! > 0 
                      ? Text("Av",style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep),)
                      : Text("Na",style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep),),
                      
                    ),
                    );
                  },
                  separatorBuilder: (context, index) {
                    return const Divider(
                      thickness: 1,
                      color: Colors.black,
                    );
                  },
                  itemCount: searchService.suggestions.length),
            ),
          ],
        ),
      ),
    );
  }
}
