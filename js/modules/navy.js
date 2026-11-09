/**
 * Estimativa de % de Gordura Corporal - Método US Navy
 */
export function calcularGorduraNavy(sexo, altura, pescoco, cintura, quadril = 0) {
  let bf = 0;
  if (sexo === 'm') {
    bf = 495 / (1.0324 - 0.19077 * Math.log10(cintura - pescoco) + 0.15456 * Math.log10(altura)) - 450;
  } else {
    bf = 495 / (1.29579 - 0.35004 * Math.log10(cintura + quadril - pescoco) + 0.22100 * Math.log10(altura)) - 450;
  }
  // Limita o valor entre 3% e 60% para evitar absurdos matemáticos de medições incorretas
  return Math.max(3, Math.min(60, bf));
}