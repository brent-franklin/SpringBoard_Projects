describe('payment tests w/ setup and tear-down', () => {
    beforeEach(() => {
        // add initial payment and tip
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
    });
    
    it('should add new payment, tip, and %tip on submitPaymentInfo()', () => {
        submitPaymentInfo();
        
        expect(Object.keys(allPayments).length).toEqual(1);

        expect(parseFloat(allPayments['payment' + paymentId].billAmt)).toEqual(100);
        expect(parseFloat(allPayments['payment' + paymentId].tipAmt)).toEqual(20);
        expect(parseFloat(allPayments['payment' + paymentId].tipPercent)).toEqual(20);

    });

    it('should create 3 new tds in payment table', () => {
        submitPaymentInfo();
        createCurPayment();

        let tds = document.querySelectorAll('#paymentTable tbody tr td');

        expect(tds.length).toEqual(4);
        expect(tds[0].innerText).toEqual('$100');
        expect(tds[1].innerText).toEqual('$20');
        expect(tds[2].innerText).toEqual('20%');
        expect(tds[3].innerText).toEqual('X');
    });

    it('should not add empty bills', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';

        submitPaymentInfo();
        createCurPayment();

        let tds = document.querySelectorAll('#paymentTable tbody tr td');

        expect(tds.length).toEqual(0);
    });

    it('should add new tr', () => {
        let payment = createCurPayment();
        allPayments.payment1 = payment;
        appendPaymentTable(payment);

        let payData = document.querySelectorAll('#paymentTable tbody tr td');

        expect(payData.length).toEqual(4);
        expect(payData[0].innerText).toEqual('$100');        
        expect(payData[1].innerText).toEqual('$20');        
        expect(payData[2].innerText).toEqual('20%'); 
        expect(payData[3].innerText).toEqual('X');
    });

    it('should create bill object w/ bill, tip, and %tip', () => {
        let payment = {
            billAmt: '100',
            tipAmt: '20',
            tipPercent: 20,
        }

        expect(createCurPayment()).toEqual(payment);
    });

    it('should update summary with sum totals and %tip total', () => {
        billAmtInput.value = '';
        tipAmtInput.value = '';

        let payment = createCurPayment();
        
        expect(createCurPayment()).toEqual();
    });

    

    afterEach(() => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentId = 0;
        allPayments = {};
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
    });
});