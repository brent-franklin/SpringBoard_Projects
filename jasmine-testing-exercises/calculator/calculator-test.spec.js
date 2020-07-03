
describe('A loan calculator', () => {

  let calc = {amount:10000, years:3, rate:7};
  
  it('should calculate the monthly payment to two decimal places', function () {
    let payment = calculateMonthlyPayment(calc);
    expect(payment).toEqual(308.77);
    expect(payment).toBeInstanceOf(Number);
    expect(calculateMonthlyPayment(calc)).toBeCloseTo(308.77, 2)
  });
  
  
  it("updateMonthly returns as defined and includes $", function() {
    let uMonthly = updateMonthly(calculateMonthlyPayment(calc));
    expect(uMonthly).toBeDefined();
    expect(uMonthly).toContain('$');
  });

    
  it('update() should update the monthly payment depending on the metrics used', () => {
    expect(update()).toEqual('$308.77');
  });

  
});

