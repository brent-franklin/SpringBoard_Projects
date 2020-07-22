describe('helpers tests w/ setup and tear-down', () => {
    beforeEach(() => {
        billAmtInput.value = 100;
        tipAmtInput.value = 20;
        submitPaymentInfo();
    });

    it('should sum all tips, bill amounts, and tip%', () => {
        expect(sumPaymentTotal('tipAmt')).toEqual(20);
        expect(sumPaymentTotal('billAmt')).toEqual(100);
        expect(sumPaymentTotal('tipPercent')).toEqual(20);
        
        billAmtInput.value = 100;
        tipAmtInput.value = 30;
        
        submitPaymentInfo();
        
        expect(sumPaymentTotal('tipAmt')).toEqual(50);
        expect(sumPaymentTotal('billAmt')).toEqual(200);
        expect(sumPaymentTotal('tipPercent')).toEqual(50);
    });
    
    it('should calculate percent tip properly', () => {
        expect(calculateTipPercent(100, 20)).toEqual(20);
    });


    it('should generate new td from value and append newTr', function () {
      let newTr = document.createElement('tr');
    
      appendTd(newTr, 'test');
    
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('test');
    });
    
    it('should generate delete td and append appendDeleteBtn to tr', function () {
      let newTr = document.createElement('tr');
    
      appendDeleteBtn(newTr);
    
      expect(newTr.children.length).toEqual(1);
      expect(newTr.firstChild.innerHTML).toEqual('X');
    });
    
    afterEach(() => {
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        allPayments = {};
        paymentId = 0;
    });

});