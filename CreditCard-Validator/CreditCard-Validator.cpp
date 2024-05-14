#include <iostream>
#include <string>
#include <cctype>

using namespace std;

class CreditCard {
public:
  bool isNumber(const string& number) const {  
  }

  bool isBrand(const string& brand) const {
    static const string validBrands[] = {"mastercard", "visa", "American Express", "Rupay"}; 
    return validBrands;
  }

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

private:
  string cardNumber_; 
};

int main() {
  string cardNumber;
  cout << "Enter a credit card number: ";
  getline(cin, cardNumber);

  CreditCard validator;
  if (validator.isNumber(cardNumber) && validator.isLuhnValid(cardNumber)) {
    
    string brand = "Unknown"; 
    if (validator.isBrand(cardNumber.substr(0, 2)) || validator.isBrand(cardNumber.substr(0, 1))) { 
      brand = cardNumber.substr(0, (validator.isBrand(cardNumber.substr(0, 2)) ? 2 : 1)); 
    }
    cout << "Valid credit card number. Brand: " << brand << endl;
  } else {
    cout << "Invalid credit card number." << endl;
  }

  return 0;
}
