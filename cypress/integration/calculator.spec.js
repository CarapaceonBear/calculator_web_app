// http://127.0.0.1:5500/index.html

beforeEach(() => {
    cy.visit("/");
});

describe("should display the calculator as expected", () => {

    it("should show the calculator on the screen", () => {
        cy.get(".full-display").should("exist");
    });
    
    it("should show all of the buttons", () => {
        cy.get(".main__button").should("have.length", 20);
    });

});

describe("should perform addition", () => {

    it("should calculate single digit addition, 3 + 2 = 5", () => {
        cy.get("#button-three").click();
        cy.get("#button-add").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 5);
    });

    it("should calculate multiple digit addition, 382 + 95 = 477", () => {
        cy.get("#button-three").click();
        cy.get("#button-eight").click();
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-nine").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 477);
    });

    it("should calculate addition of negative numbers, 6 + -9 = -3", () => {
        cy.get("#button-six").click();
        cy.get("#button-add").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", -3);
    });

    it("should calculate addition of negative numbers, -7 + -9 = -16", () => {
        cy.get("#button-subtract").click();
        cy.get("#button-seven").click();
        cy.get("#button-add").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", -16);
    });

    it("should calculate addition of decimals, 3.6 + 0.85 = 4.45", () => {
        cy.get("#button-three").click();
        cy.get("#button-decimal").click();
        cy.get("#button-six").click();
        cy.get("#button-add").click();
        cy.get("#button-zero").click();
        cy.get("#button-decimal").click();
        cy.get("#button-eight").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4.45);
    });

    it("should perform multiple additions, 3 + 3 + 8 = 14", () => {
        cy.get("#button-three").click();
        cy.get("#button-add").click();
        cy.get("#button-three").click();
        cy.get("#button-add").click();
        cy.get("#button-eight").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 14);
    })

});

describe("should perform subtraction", () => {

    it("should calculate single digit subtraction, 6 - 2 = 4", () => {
        cy.get("#button-six").click();
        cy.get("#button-subtract").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4);
    });

    it("should calculate multiple digit subtraction, 412 - 95 = 317", () => {
        cy.get("#button-four").click();
        cy.get("#button-one").click();
        cy.get("#button-two").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 317);
    });

    it("should calculate subtraction of negative numbers, 6 - -9 = 15", () => {
        cy.get("#button-six").click();
        cy.get("#button-subtract").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 15);
    });

    it("should calculate subtraction of negative numbers, -7 - -9 = 2", () => {
        cy.get("#button-subtract").click();
        cy.get("#button-seven").click();
        cy.get("#button-subtract").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 2);
    });

    it("should calculate subtraction of decimals, 3.6 - 0.85 = 2.75", () => {
        cy.get("#button-three").click();
        cy.get("#button-decimal").click();
        cy.get("#button-six").click();
        cy.get("#button-subtract").click();
        cy.get("#button-zero").click();
        cy.get("#button-decimal").click();
        cy.get("#button-eight").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 2.75);
    });

    it("should perform multiple subtractions, 14 - 3 - 8 = 3", () => {
        cy.get("#button-one").click();
        cy.get("#button-four").click();
        cy.get("#button-subtract").click();
        cy.get("#button-three").click();
        cy.get("#button-subtract").click();
        cy.get("#button-eight").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 3);
    })

});

describe("should perform multiplication", () => {

    it("should calculate single digit multiplication, 3 * 2 = 6", () => {
        cy.get("#button-three").click();
        cy.get("#button-multiply").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 6);
    });

    it("should calculate multiple digit multiplication, 24 * 13 = 312", () => {
        cy.get("#button-two").click();
        cy.get("#button-four").click();
        cy.get("#button-multiply").click();
        cy.get("#button-one").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 312);
    });

    it("should calculate multiplication of negative numbers, 6 * -9 = -54", () => {
        cy.get("#button-six").click();
        cy.get("#button-multiply").click();
        cy.get("#button-subtract").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", -54);
    });

    it("should calculate multiplication of negative numbers, -7 * -3 = 21", () => {
        cy.get("#button-subtract").click();
        cy.get("#button-seven").click();
        cy.get("#button-multiply").click();
        cy.get("#button-subtract").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 21);
    });

    it("should calculate multiplication of decimals, 3.6 * 1.5 = 5.4", () => {
        cy.get("#button-three").click();
        cy.get("#button-decimal").click();
        cy.get("#button-six").click();
        cy.get("#button-multiply").click();
        cy.get("#button-one").click();
        cy.get("#button-decimal").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 5.4);
    });

    it("should perform multiple multiplications, 2 * 6 * 3 = 36", () => {
        cy.get("#button-two").click();
        cy.get("#button-multiply").click();
        cy.get("#button-six").click();
        cy.get("#button-multiply").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 36);
    })

});

describe("should perform division", () => {

    it("should calculate single digit division, 8 / 2 = 4", () => {
        cy.get("#button-eight").click();
        cy.get("#button-divide").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4);
    });

    it("should calculate multiple digit division, 81 / 18 = 4.5", () => {
        cy.get("#button-eight").click();
        cy.get("#button-one").click();
        cy.get("#button-divide").click();
        cy.get("#button-one").click();
        cy.get("#button-eight").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4.5);
    });

    it("should calculate division of negative numbers, 6 / -3 = -2", () => {
        cy.get("#button-six").click();
        cy.get("#button-divide").click();
        cy.get("#button-subtract").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", -2);
    });

    it("should calculate division of negative numbers, -60 / -10 = 6", () => {
        cy.get("#button-subtract").click();
        cy.get("#button-six").click();
        cy.get("#button-zero").click();
        cy.get("#button-divide").click();
        cy.get("#button-subtract").click();
        cy.get("#button-one").click();
        cy.get("#button-zero").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 6);
    });

    it("should calculate division of decimals, 3.4 / 0.5 = 6.8", () => {
        cy.get("#button-three").click();
        cy.get("#button-decimal").click();
        cy.get("#button-four").click();
        cy.get("#button-divide").click();
        cy.get("#button-zero").click();
        cy.get("#button-decimal").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 6.8);
    });

    it("should perform multiple divisions, 36 / 2 / 6 = 3", () => {
        cy.get("#button-three").click();
        cy.get("#button-six").click();
        cy.get("#button-divide").click();
        cy.get("#button-two").click();
        cy.get("#button-divide").click();
        cy.get("#button-six").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 3);
    })

});

describe("should perform arithmetic in the correct order", () => {

    it("should multiply before addition, 2 + 4 * 3 = 14", () => {
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-four").click();
        cy.get("#button-multiply").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 14);
    });

    it("should divide before addition, 2 + 9 / 3 = 5", () => {
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-nine").click();
        cy.get("#button-divide").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 5);
    });

    it("should handle concurrent addition and subtraction, 2 + 9 - 3 = 8", () => {
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-nine").click();
        cy.get("#button-subtract").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 8);
    });

    it("should handle concurrent multiplication and division, 2 * 9 / 3 = 6", () => {
        cy.get("#button-two").click();
        cy.get("#button-multiply").click();
        cy.get("#button-nine").click();
        cy.get("#button-divide").click();
        cy.get("#button-three").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 6);
    });

    it("should handle all arithmetic operators in order, 2 + 9 / 3 - 7 * 2 = -9", () => {
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-nine").click();
        cy.get("#button-divide").click();
        cy.get("#button-three").click();
        cy.get("#button-subtract").click();
        cy.get("#button-seven").click();
        cy.get("#button-multiply").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", -9);
    });
    
});

describe("should calculate square roots", () => {

    it("should calculate a simple square root, √9 = 3", () => {
        cy.get("#button-root").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 3);
    });

    it("should calculate a square root to give a decimal answer, √20.25 = 4.5", () => {
        cy.get("#button-root").click();
        cy.get("#button-two").click();
        cy.get("#button-zero").click();
        cy.get("#button-decimal").click();
        cy.get("#button-two").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4.5);
    });

    it("should calculate square roots before arithmetic operators, 6√9 = 18", () => {
        cy.get("#button-six").click();
        cy.get("#button-root").click();
        cy.get("#button-nine").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 18);
    });

})

describe("should calculate powers", () => {

    it("should calculate a simple power, 2^2 = 4", () => {
        cy.get("#button-two").click();
        cy.get("#button-power").click();
        cy.get("#button-two").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 4);
    });

    it("should calculate a large power, 2^40 = 1099511627776", () => {
        cy.get("#button-two").click();
        cy.get("#button-power").click();
        cy.get("#button-four").click();
        cy.get("#button-zero").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 1099511627776);
    });

    it("should calculate a decimal power, 6.25^0.5 = 2.5", () => {
        cy.get("#button-six").click();
        cy.get("#button-decimal").click();
        cy.get("#button-two").click();
        cy.get("#button-five").click();
        cy.get("#button-power").click();
        cy.get("#button-zero").click();
        cy.get("#button-decimal").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 2.5);
    });

})

describe("should display contextual brackets", () => {

    it("should display an open bracket first", () => {
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "(");
    });

    it("should open a new bracket if immediately following an open bracket", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "((");
    });

    it("should open a new bracket if immediately following an operator", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-three").click();
        cy.get("#button-multiply").click();
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "(3×(");
    });

    it("should display a closing bracket if following a number, and a bracket is already open", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "(3)");
    });

    it("should close off a bracket pair if one is open, following a closing bracket", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-bracket").click();
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "((3))");
    });

    it("should open a new bracket if all pairs are closed, following a closing bracket", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get("#button-bracket").click();
        cy.get(".header__formula--text").should("have.text", "(3)(");
    });

    it("should calculate properly if there is no closing bracket", () => {
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 15);
    });

});

describe("should disallow operators under certain contexts", () => {

    it("should not display anything if most operators are entered first", () => {
        cy.get("#button-power").click();
        cy.get("#button-divide").click();
        cy.get("#button-multiply").click();
        cy.get("#button-add").click();
        cy.get("#button-decimal").click();
        cy.get(".header__formula--text").should("have.text", "");
    });

    it("should not allow most operators following an open bracket", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-power").click();
        cy.get("#button-divide").click();
        cy.get("#button-multiply").click();
        cy.get("#button-add").click();
        cy.get("#button-decimal").click();
        cy.get(".header__formula--text").should("have.text", "(");
    });

    it("should allow the minus symbol as the first input", () => {
        cy.get("#button-subtract").click();
        cy.get(".header__formula--text").should("have.text", "-");
        cy.get("#button-bracket").click();
        cy.get("#button-subtract").click();
        cy.get(".header__formula--text").should("have.text", "-(-");
    });

    it("should allow the square root symbol as the first input", () => {
        cy.get("#button-root").click();
        cy.get(".header__formula--text").should("have.text", "√");
        cy.get("#button-bracket").click();
        cy.get("#button-root").click();
        cy.get(".header__formula--text").should("have.text", "√(√");
    });

    it("should not allow operators to immediately follow other operators", () => {
        cy.get("#button-one").click();
        cy.get("#button-add").click();
        cy.get("#button-add").click();
        cy.get("#button-one").click();
        cy.get("#button-multiply").click();
        cy.get("#button-multiply").click();
        cy.get("#button-one").click();
        cy.get("#button-divide").click();
        cy.get("#button-divide").click();
        cy.get("#button-one").click();
        cy.get("#button-decimal").click();
        cy.get("#button-decimal").click();
        cy.get(".header__formula--text").should("have.text", "1+1×1÷1.");
    })

});

describe("should not run the calculation if the final character is an operator", () => {

    it("should not run the calculation if the final character is an operator", () => {
        cy.get("#button-eight").click();
        cy.get("#button-divide").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", "8÷");
    });

});

describe("should not run the calculation if there is no calculation", () => {

    it("should not run the calculation if the formula has no operators", () => {
        cy.get("#button-eight").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", "8");
        cy.get(".header__result--text").should("have.text", "");
    });

    it("should not run the calculation if the formula is empty", () => {
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", "");
        cy.get(".header__result--text").should("have.text", "");
    })


});

describe("should not break when handling 'infinite' returns", () => {

    it("should return 'Infinity' when dividing by 0", () => {
        cy.get("#button-five").click();
        cy.get("#button-divide").click();
        cy.get("#button-zero").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", "Infinity");
    });

    it("should return 'Infinity' when calculating a large power, such as 2^55555", () => {
        cy.get("#button-two").click();
        cy.get("#button-power").click();
        cy.get("#button-five").click();
        cy.get("#button-five").click();
        cy.get("#button-five").click();
        cy.get("#button-five").click();
        cy.get("#button-five").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", "Infinity");
    })

})

it("should remove characters with backspace button", () => {
    cy.get("#button-eight").click();
    cy.get("#button-eight").click();
    cy.get("#button-eight").click();
    cy.get(".header__formula--text").should("have.text", "888");
    cy.get("#button-backspace").click();
    cy.get(".header__formula--text").should("have.text", "88");
    
})

describe("should handle calculations with bracket pairs", () => {

    it("should calculate brackets before other operators, 2 * (2 + 2) = 8", () => {
        cy.get("#button-two").click();
        cy.get("#button-multiply").click();
        cy.get("#button-bracket").click();
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-two").click();
        cy.get("#button-bracket").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 8);
    })

    it("should calculate multiple bracket pairs, (2 * 3) + (2 + 2) = 10", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-two").click();
        cy.get("#button-multiply").click();
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get("#button-add").click();
        cy.get("#button-bracket").click();
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-two").click();
        cy.get("#button-bracket").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 10);
    })

    it("should multiply brackets which are directly following, (2 * 3)(2 + 2) = 24", () => {
        cy.get("#button-bracket").click();
        cy.get("#button-two").click();
        cy.get("#button-multiply").click();
        cy.get("#button-three").click();
        cy.get("#button-bracket").click();
        cy.get("#button-bracket").click();
        cy.get("#button-two").click();
        cy.get("#button-add").click();
        cy.get("#button-two").click();
        cy.get("#button-bracket").click();
        cy.get("#button-equals").click();
        cy.get(".header__formula--text").should("have.text", 24);
    })

})


