
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:library_management/Screen/auth_screen.dart';
import 'package:library_management/Screen/history_screen.dart';
import 'package:library_management/Screen/profile_screen.dart';
import 'package:library_management/Screen/search.dart';
import 'package:library_management/main.dart' as app;
import 'package:library_management/widgets/custom_textfield.dart';
void main(){

// Ensure's that the context is build
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group("End-to-End testing : ", () {
    group("Login Flow -> ", () { 
      testWidgets("Login with Incorrect Username or Password ", (widgetTester) async {
      // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      // Pump Main
      await widgetTester.pumpAndSettle();
      // Pump Auth-Screen
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "0956");
      // tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all the widget changes
      await widgetTester.pumpAndSettle();
      // check for snackbar message
      expect(find.byType(SnackBar), findsOneWidget);

    });

      testWidgets("Login without Username or Password", (widgetTester) async {
      // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();

      // tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all the widget changes
      await widgetTester.pumpAndSettle();

      // check
      expect(find.text("Enter your Email"), findsOneWidget);
      expect(find.text("Enter your Password"), findsOneWidget);
    });

      testWidgets("Login with Correct Username and Password", (widgetTester) async {
      // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      // check
      expect(find.byType(HistoryScreen), findsOneWidget);
    });

    });

    group("Logout Flow -> ", () { 
      testWidgets("Logout and details checking in profile Screen", (widgetTester) async {
        // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      
      // open drawer
      await widgetTester.tap(find.byTooltip("Open navigation menu"));

      // pump drawer
      await widgetTester.pumpAndSettle();
      // find the profile screen
      expect(find.byType(Profile), findsOneWidget);

      // check details
      expect(find.text("akash@codehomies.com"), findsOneWidget);


      // tap logout button
      await widgetTester.tap(find.byType(ElevatedButton));

      // pump Auth-Screen
      await widgetTester.pumpAndSettle();

      // check for Auth Screen
      expect(find.byType(AuthScreen), findsOneWidget);


      
      });
    });
   
    group("Bottom Nav-Bar Flow -> ", () { 
      testWidgets("Bottom Nav bar", (widgetTester) async {

        // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      // Tap Search Icon
      await widgetTester.tap(find.byIcon(Icons.search));
      // pump Search Screen
      await widgetTester.pumpAndSettle();

      expect(find.byType(Search), findsOneWidget);
      });
    });
   
    group("History Screen Flow -> ", () { 

      testWidgets("User with Some History", (widgetTester) async {
        // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();

      // check for list of books
      expect(find.byType(ExpansionTile), findsWidgets);

      // Tap the first list item to check of expansion
      await widgetTester.tap(find.byType(ExpansionTile).at(0));

      // check the contents inside the expansion
      expect(find.byType(ListTile), findsWidgets);

      });
      testWidgets("User with No History", (widgetTester) async {
        // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "nobooks@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      // check for text
      expect(find.text("No books taken yet"), findsOneWidget);


      });
    });

    group("Search Flow -> ", () { 
      testWidgets("Searching for books", (widgetTester) async {
        // calling main function of the app
      app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      //  Go to search screen
      await widgetTester.tap(find.byIcon(Icons.search));
      await widgetTester.pumpAndSettle();
      // enter text "let" in text box
      await widgetTester.enterText(find.byType(TextField),"let");
      await widgetTester.pumpAndSettle();
      // Check for a list when it matches
      expect(find.byType(ListTile), findsWidgets);

      // Clear text from text box
      await widgetTester.enterText(find.byType(TextField),"");
      await widgetTester.pumpAndSettle();
      // enter text "Random String" in text box
      await widgetTester.enterText(find.byType(TextField),"Random String");
      await widgetTester.pumpAndSettle();

      // check for a tile with following text:
      expect(find.text("No Book found"), findsOneWidget);
      });
    });
   
    group("Scanning Flow -> ", () { 
      testWidgets("Scanning a Valid Book", (widgetTester) async {
        app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();
      // Go to scanner page
      await widgetTester.tap(find.byIcon(Icons.qr_code));
      await widgetTester.pumpAndSettle();
      print("Scan a valid barcode in 10 sec: ");
      await Future.delayed(Duration(seconds: 10));

      await widgetTester.pumpAndSettle();

      expect(find.byType(Card), findsOneWidget);

      
      });
      testWidgets("Borrowing a available book", (widgetTester) async {
        app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();

      await widgetTester.tap(find.byIcon(Icons.qr_code));

      await widgetTester.pumpAndSettle();
      
      print("Scan a available book in 10 sec: ");
      await Future.delayed(Duration(seconds: 10));

      await widgetTester.pumpAndSettle();
      // Find the borrow button
      await widgetTester.tap(find.byType(ElevatedButton));

      await widgetTester.pumpAndSettle();
      // check
      expect(find.text("Book issued"), findsOneWidget);

      
      });

      testWidgets("Borrowing a non-available book", (widgetTester) async {
        app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();

      await widgetTester.tap(find.byIcon(Icons.qr_code));

      await widgetTester.pumpAndSettle();
      print("Scan an valid barcode of a book which is not available in 10 sec: ");
      await Future.delayed(Duration(seconds: 10));

      await widgetTester.pumpAndSettle();

      await widgetTester.tap(find.byType(ElevatedButton));

      await widgetTester.pumpAndSettle();

      expect(find.text("Book already issued to student"), findsOneWidget);

      
      });

       testWidgets("Scanning a Invalid Book", (widgetTester) async {
        app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();

      await widgetTester.tap(find.byIcon(Icons.qr_code));

      await widgetTester.pumpAndSettle();
      print("Scan a invalid barcode in 10 sec: ");
      await Future.delayed(Duration(seconds: 10));

      await widgetTester.pump();

      expect(find.text("Retry"), findsOneWidget);

      
      });

      testWidgets("Cancel Scanning", (widgetTester) async {
        app.main();
      // pumping widget until no more widget is remaining
      await widgetTester.pumpAndSettle();
      await widgetTester.pumpAndSettle();
      // Type in username and password in the text field
      await widgetTester.enterText(find.byType(CustomTextField).at(0), "akash@codehomies.com");
      await widgetTester.enterText(find.byType(CustomTextField).at(1), "123456");
      // Tap the button
      await widgetTester.tap(find.byType(ElevatedButton));
      // pump all widget changes
      await widgetTester.pumpAndSettle();

      await widgetTester.tap(find.byIcon(Icons.qr_code));

      await widgetTester.pumpAndSettle();
      
      print("Don't scan any code, directly press cancel");
      await Future.delayed(Duration(seconds: 10));

      await widgetTester.pump();

      expect(find.text("Retry"), findsOneWidget);

      
      });
    });
   });



}