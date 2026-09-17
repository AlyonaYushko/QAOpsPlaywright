Feature: Error validations
@Validation
@foo
  Scenario Outline: Plcing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
    | username           | password           |
    | rahulshettyacademy | Learning@830$3mK2  |
    | anshika@gmail.com  | Iamking@000        |