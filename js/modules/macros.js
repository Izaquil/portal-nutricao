/**
 * Motor de Cálculo Energético e Macronutrientes
 */

// Equação Mifflin-St Jeor (TMB)
export function calcularTMB(sexo, peso, altura, idade) {
  if (sexo === 'm') {
    return (10 * peso) + (6.25 * altura) - (5 * idade) + 5;
  }
  return (10 * peso) + (6.25 * altura) - (5 * idade) - 161;
}

// Gasto Energético Total (GET / TDEE)
export function calcularGET(tmb, fatorAtividade) {
  return tmb * fatorAtividade;
}

// Divisão de Macronutrientes: Prot 2.0g/kg | Gord 0.8g/kg | Carbs restante
export function calcularMacros(peso, caloriasMeta) {
  const gProteina = peso * 2.0;
  const kcalProteina = gProteina * 4;

  const gGordura = peso * 0.8;
  const kcalGordura = gGordura * 9;

  const kcalRestantes = caloriasMeta - (kcalProteina + kcalGordura);
  const gCarboidrato = Math.max(0, kcalRestantes / 4);

  return {
    proteina: { g: Math.round(gProteina), kcal: Math.round(kcalProteina) },
    gordura: { g: Math.round(gGordura), kcal: Math.round(kcalGordura) },
    carboidrato: { g: Math.round(gCarboidrato), kcal: Math.round(Math.max(0, kcalRestantes)) }
  };
}