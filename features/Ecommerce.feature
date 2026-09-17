Feature: Ecommerce validations
  @Regression
  Scenario: Plcing the Order
    Given a login to Ecommerce application with "anshika@gmail.com" and "Iamking@000"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the Order
    Then Verify order is present in the OrderHistory


  @Validation
  Scenario Outline: Plcing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
      | username           | password          |
      | rahulshettyacademy | Learning@830$3mK2 |
      | anshika@gmail.com  | Iamking@000       |