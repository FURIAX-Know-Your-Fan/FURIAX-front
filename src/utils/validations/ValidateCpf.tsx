export const validate_cpf = (cpf: string) => {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/\D/g, "");

  // Verifica se tem 11 dígitos
  if (cpf.length !== 11) return false;

  // Elimina CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) return false;

  // Valida os dígitos verificadores
  const calcCheckDigit = (base: string, factor: number): number => {
    let total = 0;
    for (let i = 0; i < base.length; i++) {
      total += parseInt(base[i]) * factor--;
    }
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const digit1 = calcCheckDigit(cpf.slice(0, 9), 10);
  const digit2 = calcCheckDigit(cpf.slice(0, 10), 11);

  return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
};
