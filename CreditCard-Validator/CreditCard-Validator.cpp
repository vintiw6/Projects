#include <iostream>
#include <string>
#include <cctype>
/*The <cctype> header file in C++ is part of the C Standard Library and provides functions for classifying and manipulating characters
       e.g. isdigit(c): Checks if c is a digit (0-9).*/

using namespace std;

class CreditCard {
public:

  bool isNumber(const string& number) const {  
    return number.length() == 16;
  }
  /*Here we are comparing the given card number if it consist of 16 digits or not*/


  bool isBrand(const string& brand) const {
    static const string validBrands[] = {"mastercard", "visa", "American Express", "Rupay"}; 
    return validBrands;
  }
  /*Here we are checking the given card brand if it cmatches or not*/


  bool isLuhnValid(const string& cardNo) const {
    int nDigits = cardNo.length();
    int nSum = 0, isSecond = false;
    for (int i = nDigits - 1; i >= 0; i--) {
      int d = cardNo[i] - '0';
      if (isSecond) {
        d *= 2;
      }
      nSum += d / 10;
      nSum += d % 10;
      isSecond = !isSecond;
    }
    return (nSum % 10 == 0);
  }
/*Here we are using luhn algorithm to finally verify if its a actual card number or not*/  
// For further info on this algorithm = https://www.geeksforgeeks.org/luhn-algorithm/ 
};

int main() {
  string cardNumber;
  cout << "Enter a credit card number: ";
  getline(cin, cardNumber);

  CreditCard validator;
  if (validator.isNumber(cardNumber) && validator.isLuhnValid(cardNumber)) {
    /* This is to ensure that all the steps go continously */
    
    string brand = "Unknown"; 
    if (validator.isBrand(cardNumber.substr(0, 2)) || validator.isBrand(cardNumber.substr(0, 1))) { 
      brand = cardNumber.substr(0, (validator.isBrand(cardNumber.substr(0, 2)) ? 2 : 1)); 
    }
    /* Incase the brand doesn't match*/
    cout << "Valid credit card number. Brand: " << brand << endl;
  } else {
    cout << "Invalid credit card number." << endl;
  }

  return 0;
}
