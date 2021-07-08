const Order = require("./Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHOICE: Symbol("choice"),
    SIZE:   Symbol("size"),
    SAUCES: Symbol("sauces"),
    TOPPINGS:   Symbol("toppings"),
    TORTILA_CHIPS: Symbol("tortilaChips"),
    DRINKS:  Symbol("drinks")
});


module.exports = class BurritoOrder extends Order{
    constructor(){
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sSauces = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sTortillaChips = "";
        this.sItem = "Burrito";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                this.stateCur = OrderState.CHOICE;
                aReturn.push("Welcome to Sachita's Burrito.");
                aReturn.push("Would you like to order Burrito or Chipotle?");
                break;
            case OrderState.CHOICE:
                this.sChoice = sInput;
                this.sItem = this.sChoice;
                if(this.sItem == "Chipotle")
                {
                    this.stateCur = OrderState.SAUCES
                    aReturn.push(`You can order ${this.sChoice}`);
                    aReturn.push("What sauces would you like? (hot chilli/mild chili)");
                } 
                else
                {
                    this.stateCur = OrderState.SIZE
                    aReturn.push(`You can order ${this.sChoice}`);
                    aReturn.push("What size would you like? (small /medium /large)");
                }
                break;
            case OrderState.SAUCES:
                this.stateCur = OrderState.TORTILA_CHIPS;
                this.sSauces = sInput;
                aReturn.push("Would you like to order a tortila chips with that? (yes/no)");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.TORTILA_CHIPS
                this.sToppings = sInput;
                aReturn.push("Would you like to order a tortila chips with that? (yes/no)");
                break;
            case OrderState.TORTILA_CHIPS:
                this.stateCur = OrderState.DRINKS
                this.sTortillaChips = sInput;
                aReturn.push("Would you like drinks with that? (yes/no)");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if(sInput.toLowerCase() != "no")
                {
                    this.sDrinks = "Drink";
                }
                aReturn.push("Thank-you for your order of");
                if(this.sItem == "Burrito")
                    aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                else
                    aReturn.push(`${this.sItem} with ${this.sSauces}`);
                if(this.sTortillaChips != "no" && this.sTortillaChips != "No"){
                    this.sTortillaChips = "Tortilla Chips";
                    aReturn.push(this.sTortillaChips);
                }
                if(this.sDrinks){
                    aReturn.push(this.sDrinks);
                }
                var orderTotal = this.priceTotal();
                aReturn.push(`Your order total is: $ ${orderTotal.toFixed(2)}`);
                let d = new Date(); 
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
    priceTotal()
        {
            const burritoSmall = 10;
            const burritoMedium = 15;
            const burritoLarge = 20;
            const chipotleBowl = 18;
            const chipsPrice = 2.99;
            const drinkPrice = 1.49;
            const saucePrice = 1.25;
            const tax = 0.13;
            var totalPrice;

            if(this.sItem == "Burrito" && this.sSize == "small")
            {
                totalPrice = burritoSmall + (burritoSmall*tax);
            }
            else if(this.sItem == "Burrito" && this.sSize == "medium")
            {
                totalPrice = burritoMedium + (burritoMedium*tax);
            }
            else if(this.sItem == "Burrito" && this.sSize == "large")
            {
                totalPrice = burritoLarge + (burritoLarge*tax);
            }
            else if(this.sItem == "Chipotle")
            {
                totalPrice = chipotleBowl + (chipotleBowl*tax) + saucePrice;
            }
            if(this.sTortillaChips == "Tortilla Chips")
                totalPrice = totalPrice + chipsPrice;
            if(this.sDrinks == "Drink")
                totalPrice = totalPrice + drinkPrice;
            return totalPrice;
        };
}
