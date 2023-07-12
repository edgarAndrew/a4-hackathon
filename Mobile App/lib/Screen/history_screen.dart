import 'package:flutter/material.dart';
import 'package:library_management/global_variable.dart';
import 'package:provider/provider.dart';
import '../provider/user_provider.dart';

class HistoryScreen extends StatefulWidget {
  const HistoryScreen({super.key});

  @override
  State<HistoryScreen> createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<userProvider>(context, listen: false).user;
    List month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    if (user.history!.isEmpty) {
      return const Scaffold(
        body: SafeArea(
          child: Center(child: Text("No books taken yet")),
        ),
      );
    }
    return Scaffold(
      body: SafeArea(
        child: Container(
          color: GlobalVariable.dark,
          padding: const EdgeInsets.only(top: 20, left: 10, right: 10),
          child: ListView.separated(
              itemBuilder: (context, index) {
                List dueDate = user.history![index].dueDate!.split("/");
                List issueDate = user.history![index].issuedDate!.split("T")[0].split('-');
                return Container(
                  color: user.history![index].status! == "returned"
                      ? GlobalVariable.grey
                      : user.history![index].isDue! == "false"
                          ? GlobalVariable.green
                          : GlobalVariable.red,
                  child: ExpansionTile(
                    textColor: Colors.black,
                    title: Text(
                      user.history![index].title!,
                      style: const TextStyle(fontWeight: FontWeight.w900),
                    ),
                    subtitle: Text(user.history![index].author!),
                    trailing: Container(
                      width: 60,
                      color: GlobalVariable.dark,
                      padding: const EdgeInsets.only(right: 20,left:20,),
                      child: Column(
                        children: [
                          if(user.history![index].status! == "returned" ) ...[
                              Text(issueDate[2],style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep),),
                              Text(month[int.parse(issueDate[1])],style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep)),
                            
                          ] else ...[
                              Text(dueDate[0],style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep),),
                              Text(month[int.parse(dueDate[1])],style: TextStyle(fontWeight: FontWeight.bold,color: GlobalVariable.whiteRep)),
                          ]
                        ],
                      ),
                    ),
                    children: [
                      Container(
                          width: double.maxFinite,
                          margin: const EdgeInsets.all(20),
                          child: SingleChildScrollView(
                            child: ListTile(
                              title: Text(user.history![index].description!),
                            ),
                          )),
                    ],
                  ),
                );
              },
              separatorBuilder: (context, index) {
                return const Divider();
              },
              itemCount: user.history!.length),
        ),
      ),
    );
  }
}
