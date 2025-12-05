import type { ICocktail } from "../../app/types/ICocktail.interface"

export function getById(_id: number): ICocktail | null {
  for (let c of sayaCocktails) {
    if (c._id == _id) return c
  }
  return null
}

export const sayaCocktails: ICocktail[] = [
  { "_id": 1, "category": "ДЖИН", "name": "Bombay Sapphire", "price": 600, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "классический сухой, можжевельник + цитрусовые специи", "tier": "средне+" },
  { "_id": 2, "category": "ДЖИН", "name": "Bosford", "price": 450, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "мягкий, слегка сладковатый можжевельник", "tier": "средне" },
  { "_id": 3, "category": "ДЖИН", "name": "Gin Mare Capri", "price": 850, "volume": "30 мл", "type": "короткий", "alcohol": 42.7, "description": "средиземноморский: оливки, розмарин, тимьян, цитрус", "tier": "премиум" },
  { "_id": 4, "category": "ДЖИН", "name": "Roku", "price": 700, "volume": "30 мл", "type": "короткий", "alcohol": 43, "description": "японский: юдзу, сакура, сенча, саншо", "tier": "премиум" },

  { "_id": 5, "category": "ВОДКА", "name": "Organic", "price": 200, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "простая нейтральная органическая", "tier": "бюджет" },
  { "_id": 6, "category": "ВОДКА", "name": "Онегин", "price": 350, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "мягкая российская премиум", "tier": "средне" },
  { "_id": 7, "category": "ВОДКА", "name": "Grey Goose", "price": 580, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "французская пшеничная, очень чистая", "tier": "премиум" },
  { "_id": 8, "category": "ВОДКА", "name": "Isfjord", "price": 680, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "арктическая из ледниковой воды, сверхмягкая", "tier": "премиум" },

  { "_id": 9, "category": "ВИСКИ", "name": "Jack Daniel’s Old No.7", "price": 430, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "теннесси, угольная фильтрация, сладковатый дым", "tier": "средне" },
  { "_id": 10, "category": "ВИСКИ", "name": "Dewar’s 8 y.o.", "price": 500, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "лёгкий шотландский бленд, мёд и фрукты", "tier": "средне" },
  { "_id": 11, "category": "ВИСКИ", "name": "Woodford Reserve", "price": 690, "volume": "30 мл", "type": "короткий", "alcohol": 43.2, "description": "американский бурбон: ваниль, карамель, специи", "tier": "средне+" },
  { "_id": 12, "category": "ВИСКИ", "name": "Chivas Regal 12 y.o.", "price": 700, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "мягкий бленд: яблоко, ваниль, орех", "tier": "средне+" },
  { "_id": 13, "category": "ВИСКИ", "name": "Laphroaig 10 y.o.", "price": 1100, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "мощный торфяной айла: дым, йод, соль", "tier": "премиум" },
  { "_id": 14, "category": "ВИСКИ", "name": "The Balvenie DoubleWood 12 y.o.", "price": 1400, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "мёд, ваниль, орех, два типа бочек", "tier": "премиум" },
  { "_id": 15, "category": "ВИСКИ", "name": "Macallan 12 y.o.", "price": 2000, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "хересный Speyside: сухофрукты, шоколад", "tier": "люкс" },
  { "_id": 16, "category": "ВИСКИ", "name": "Tamdhu 12 y.o.", "price": 2300, "volume": "30 мл", "type": "короткий", "alcohol": 43, "description": "насыщенный хересный: изюм, специи, шоколад", "tier": "люкс" },

  { "_id": 17, "category": "РОМ", "name": "Bacardi Oakheart", "price": 500, "volume": "30 мл", "type": "короткий", "alcohol": 35, "description": "пряный с дубом, корицей и мёдом", "tier": "средне" },
  { "_id": 18, "category": "РОМ", "name": "Havana Club 3", "price": 510, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "светлый кубинский, лёгкий и чистый", "tier": "средне" },
  { "_id": 19, "category": "РОМ", "name": "Havana Club 7 Añejo", "price": 570, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "тёмный кубинский: дуб, ваниль, табак", "tier": "средне+" },
  { "_id": 20, "category": "РОМ", "name": "Botucal Reserva Exclusiva", "price": 900, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "венесуэльский премиум: карамель, тропики", "tier": "премиум" },

  { "_id": 21, "category": "ТЕКИЛА", "name": "Jose Cuervo Blanco", "price": 350, "volume": "30 мл", "type": "короткий", "alcohol": 38, "description": "серебряная, яркая агава", "tier": "бюджет" },
  { "_id": 22, "category": "ТЕКИЛА", "name": "Jose Cuervo Especial Reposado", "price": 450, "volume": "30 мл", "type": "короткий", "alcohol": 38, "description": "золотая, мягкая ванильно-дубовая", "tier": "средне" },
  { "_id": 23, "category": "ТЕКИЛА", "name": "Don Julio Blanco", "price": 950, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "чистая премиальная серебряная, травянистая", "tier": "премиум" },
  { "_id": 24, "category": "ТЕКИЛА", "name": "Don Julio Reposado", "price": 1050, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "выдержанная, мягкая ваниль и карамель", "tier": "премиум" },

  { "_id": 25, "category": "КОНЬЯК", "name": "Martell VS", "price": 750, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "молодой французский, фруктовый и лёгкий", "tier": "средне+" },
  { "_id": 26, "category": "КОНЬЯК", "name": "Courvoisier VSOP", "price": 750, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "элегантный, цветочно-ванильный", "tier": "средне+" },
  { "_id": 27, "category": "КОНЬЯК", "name": "Арарат Ахтамар", "price": 1150, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "армянский 10 лет: сухофрукты, орех", "tier": "премиум" },
  { "_id": 28, "category": "КОНЬЯК", "name": "Hennessy X.O.", "price": 3000, "volume": "30 мл", "type": "короткий", "alcohol": 40, "description": "насыщенный, долгая выдержка, специи", "tier": "люкс" },

  { "_id": 29, "category": "ВЕРМУТЫ", "name": "Martini Rosso", "price": 620, "volume": "60 мл", "type": "средний", "alcohol": 15, "description": "сладкий красный, травы и карамель", "tier": "средне+" },
  { "_id": 30, "category": "ВЕРМУТЫ", "name": "Martini Bianco", "price": 620, "volume": "60 мл", "type": "средний", "alcohol": 15, "description": "сладкий белый, ваниль и цитрус", "tier": "средне+" },
  { "_id": 31, "category": "ВЕРМУТЫ", "name": "Martini Extra Dry", "price": 620, "volume": "60 мл", "type": "средний", "alcohol": 15, "description": "сухой, травяной и цитрусовый", "tier": "средне+" },
  { "_id": 32, "category": "ВЕРМУТЫ", "name": "Martini Fiero", "price": 620, "volume": "60 мл", "type": "средний", "alcohol": 14.9, "description": "яркий красный апельсин, горьковато-сладкий", "tier": "средне+" },

  { "_id": 33, "category": "ДИЖЕСТИВЫ", "name": "Jägermeister", "price": 350, "volume": "30 мл", "type": "короткий", "alcohol": 35, "description": "травяной ликёр, 56 трав и специй", "tier": "средне" },
  { "_id": 34, "category": "ДИЖЕСТИВЫ", "name": "Calem Fine Tawny Porto", "price": 400, "volume": "30 мл", "type": "короткий", "alcohol": 20, "description": "порто тони, орехи и сухофрукты", "tier": "средне" },
  { "_id": 35, "category": "ДИЖЕСТИВЫ", "name": "Amaro Nonino Quintessentia", "price": 700, "volume": "30 мл", "type": "короткий", "alcohol": 35, "description": "горький травяной ама́ро, апельсин и специи", "tier": "премиум" },
  { "_id": 36, "category": "ДИЖЕСТИВЫ", "name": "Pedro Ximénez", "price": 750, "volume": "30 мл", "type": "короткий", "alcohol": 17, "description": "сладкий херес: изюм, инжир, патока", "tier": "премиум" },

  { "_id": 37, "category": "НАСТОЙКИ", "name": "Солёная карамель", "price": 300, "volume": "30 мл", "type": "короткий", "alcohol": 30, "description": "сладко-солёная десертная", "tier": "бюджет" },
  { "_id": 38, "category": "НАСТОЙКИ", "name": "Яблоко с корицей и ванилью", "price": 300, "volume": "30 мл", "type": "короткий", "alcohol": 30, "description": "тёплый десертный вкус", "tier": "бюджет" },
  { "_id": 39, "category": "НАСТОЙКИ", "name": "Вишня с дубом", "price": 300, "volume": "30 мл", "type": "короткий", "alcohol": 30, "description": "ягодно-древесная", "tier": "бюджет" },

  { "_id": 40, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Дайкири", "volume": "100 мл", "price": 750, "type": "средний", "strength": "средняя крепость", "description": "кислый цитрусовый (ром, лайм, сахар)", "tier": "средний" },
  { "_id": 41, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Маргарита", "volume": "120 мл", "price": 850, "type": "средний", "strength": "средняя крепость", "description": "кислый цитрусовый + апельсиновый ликёр", "tier": "средний" },
  { "_id": 42, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Кловер клаб", "volume": "130 мл", "price": 750, "type": "средний", "strength": "средняя крепость", "description": "свежий малиново-травяной", "tier": "средний" },
  { "_id": 43, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Космополитен", "volume": "120 мл", "price": 650, "type": "средний", "strength": "средняя крепость", "description": "ягодно-кислый клюквенный", "tier": "доступный" },
  { "_id": 44, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Апероль Спритц", "volume": "400 мл", "price": 950, "type": "большой лонг", "strength": "низкая крепость", "description": "горько-сладкий апельсиновый", "tier": "средне+" },
  { "_id": 45, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Порн Стар", "volume": "110 мл", "price": 950, "type": "средний", "strength": "средняя крепость", "description": "сладкий ванильно-маракуйевый", "tier": "средне+" },
  { "_id": 46, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Негрони", "volume": "200 мл", "price": 950, "type": "средний+", "strength": "крепкий", "description": "горький травяной (кампари, вермут, джин)", "tier": "средне+" },
  { "_id": 47, "category": "КЛАССИЧЕСКИЕ КОКТЕЙЛИ", "name": "Палома", "volume": "350 мл", "price": 850, "type": "большой лонг", "strength": "низкая-средняя", "description": "ягодно-цитрусовый грейпфрут-клубника", "tier": "средний" },

  { "_id": 48, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Красный бейзил смеш", "volume": "170 мл", "price": 900, "type": "средний", "strength": "средняя крепость", "description": "свежий красный базилик + можжевельник", "tier": "средне+" },
  { "_id": 49, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Вечерняя Мелодия", "volume": "350 мл", "price": 750, "type": "большой лонг", "strength": "низкая крепость", "description": "сладкая дыня с аперолем и тоником", "tier": "средний" },
  { "_id": 50, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Шисо физз", "volume": "130 мл", "price": 750, "type": "средний", "strength": "средняя крепость", "description": "свежий шисо + ягоды + апероль", "tier": "средний" },
  { "_id": 51, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Ягодный каприз", "volume": "150 мл", "price": 750, "type": "средний", "strength": "средняя крепость", "description": "сладкий десертный ягодный с ванильной водкой", "tier": "средний" },
  { "_id": 52, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Манго Сгроппино", "volume": "160 мл", "price": 950, "type": "средний", "strength": "низкая-средняя", "description": "десертный манговый сорбет + игристое", "tier": "средне+" },
  { "_id": 53, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Беллини лаунж", "volume": "400 мл", "price": 950, "type": "большой лонг", "strength": "низкая крепость", "description": "сладкий инжир-персик + ваниль + игристое", "tier": "средне+" },
  { "_id": 54, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Малиновый гимлет", "volume": "120 мл", "price": 750, "type": "средний", "strength": "средняя крепость", "description": "кислый малиновый с джином", "tier": "средний" },
  { "_id": 55, "category": "АВТОРСКИЕ КОКТЕЙЛИ", "name": "Фиерро-Спритц", "volume": "400 мл", "price": 850, "type": "большой лонг", "strength": "низкая крепость", "description": "горько-сладкий красный апельсин (Martini Fiero)", "tier": "средний" },

  { "_id": 56, "category": "ПИВО РАЗЛИВНОЕ", "name": "Светлый лагер", "volume": "450 мл / 330 мл", "price": "860 / 640", "type": "большой/средний", "alcohol": "4.5–5", "description": "классический светлый лагер", "tier": "средне+" },
  { "_id": 57, "category": "ПИВО РАЗЛИВНОЕ", "name": "Пшеничное нефильтрованное", "volume": "450 мл / 330 мл", "price": "860 / 640", "type": "большой/средний", "alcohol": "~5", "description": "банан, гвоздика, мутное", "tier": "средне+" },

  { "_id": 58, "category": "ПИВО БУТЫЛОЧНОЕ", "name": "Азотное Тёмное", "volume": "440 мл", "price": 980, "type": "бутылка", "alcohol": "~4.5", "description": "мягкое кремовое тёмное с азотом", "tier": "премиум" },
  { "_id": 59, "category": "ПИВО БУТЫЛОЧНОЕ", "name": "Светлый лагер", "volume": "500 мл", "price": 980, "type": "бутылка", "alcohol": "~5", "description": "классический светлый", "tier": "премиум" },
  { "_id": 60, "category": "ПИВО БУТЫЛОЧНОЕ", "name": "Тёмный лагер", "volume": "500 мл", "price": 980, "type": "бутылка", "alcohol": "~5", "description": "карамельно-жареный", "tier": "премиум" },
  { "_id": 61, "category": "ПИВО БУТЫЛОЧНОЕ", "name": "Нефильтрованное пшеничное", "volume": "500 мл", "price": 1150, "type": "бутылка", "alcohol": "~5", "description": "насыщенное пшеничное", "tier": "премиум" },
  { "_id": 62, "category": "ПИВО БУТЫЛОЧНОЕ", "name": "Безалкогольное", "volume": "330 мл", "price": 800, "type": "бутылка", "alcohol": 0, "description": "классическое безалкогольное", "tier": "средне+" },

  { "_id": 63, "category": "ИГРИСТЫЕ ВИНА", "name": "Prosecco DOC Brut", "volume": "125 мл / 750 мл", "price": "650 / 3800", "type": "бокал/бутылка", "alcohol": 11, "description": "сухое, зелёное яблоко, цветы", "tier": "средне+/премиум" },
  { "_id": 64, "category": "ИГРИСТЫЕ ВИНА", "name": "Codorniu Brut Reserva Limited Edition", "volume": "125 мл / 750 мл", "price": "780 / 4100", "type": "бокал/бутылка", "alcohol": 11.5, "description": "кавa, цитрус и бриошь", "tier": "премиум" },
  { "_id": 65, "category": "ИГРИСТЫЕ ВИНА", "name": "Domaine Jean Collet et Fils, Crémant de Bourgogne", "volume": "750 мл", "price": 6900, "type": "бутылка", "alcohol": 12, "description": "французский креман, элегантный и минеральный", "tier": "люкс" },

  { "_id": 66, "category": "БЕЛЫЕ ВИНА", "name": "Vinho Verde Branco", "volume": "125 мл / 750 мл", "price": "520 / 3100", "type": "бокал/бутылка", "alcohol": "9–10", "description": "лёгкое португальское, лайм и пузырьки", "tier": "средне+" },
  { "_id": 67, "category": "БЕЛЫЕ ВИНА", "name": "Botter, Pinot Grigio, delle Venezie", "volume": "125 мл / 750 мл", "price": "550 / 3300", "type": "бокал/бутылка", "alcohol": 12, "description": "итальянское, груша и миндаль", "tier": "средне+" },
  { "_id": 68, "category": "БЕЛЫЕ ВИНА", "name": "Nik Weis, Urban Riesling", "volume": "125 мл / 750 мл", "price": "640 / 3800", "type": "бокал/бутылка", "alcohol": 11, "description": "немецкий рислинг, персик и кислотность", "tier": "премиум" },
  { "_id": 69, "category": "БЕЛЫЕ ВИНА", "name": "“Waka” Sauvignon Blanc", "volume": "125 мл / 750 мл", "price": "770 / 4600", "type": "бокал/бутылка", "alcohol": 13, "description": "новозеландский совиньон, крыжовник и травы", "tier": "премиум" },
  { "_id": 70, "category": "БЕЛЫЕ ВИНА", "name": "“Mar de Frades” Albariño", "volume": "125 мл / 750 мл", "price": "770 / 4600", "type": "бокал/бутылка", "alcohol": 12.5, "description": "испанский альбариньо, морская соль и персик", "tier": "премиум" },
  { "_id": 71, "category": "БЕЛЫЕ ВИНА", "name": "Baudouin Millet Chablis", "volume": "750 мл", "price": 8700, "type": "бутылка", "alcohol": 12.5, "description": "классический шабли, минеральность и яблоко", "tier": "люкс" },

  { "_id": 72, "category": "РОЗОВЫЕ ВИНА", "name": "Vinho Verde Rosé", "volume": "125 мл / 750 мл", "price": "530 / 3200", "type": "бокал/бутылка", "alcohol": "9–10", "description": "лёгкое португальское розэ, клубника", "tier": "средне+" },
  { "_id": 73, "category": "РОЗОВЫЕ ВИНА", "name": "Peyrassol, “Lou”, Côtes de Provence", "volume": "125 мл / 750 мл", "price": "770 / 6100", "type": "бокал/бутылка", "alcohol": 13, "description": "прованское розэ, элегантное и сухое", "tier": "премиум" },

  { "_id": 74, "category": "КРАСНЫЕ ВИНА", "name": "Усадьба Перовских Мерло Лимит серия", "volume": "125 мл / 750 мл", "price": "700 / 4200", "type": "бокал/бутылка", "alcohol": 14, "description": "российское мерло, спелая слива", "tier": "премиум" },
  { "_id": 75, "category": "КРАСНЫЕ ВИНА", "name": "Sophenia, “Altosur” Malbec", "volume": "125 мл / 750 мл", "price": "720 / 4300", "type": "бокал/бутылка", "alcohol": 14, "description": "аргентинский мальбек, фиалка и чернослив", "tier": "премиум" },
  { "_id": 76, "category": "КРАСНЫЕ ВИНА", "name": "Ramon Bilbao Crianza", "volume": "125 мл / 750 мл", "price": "720 / 4300", "type": "бокал/бутылка", "alcohol": 14, "description": "риоха крианса, ваниль и ягоды", "tier": "премиум" },
  { "_id": 77, "category": "КРАСНЫЕ ВИНА", "name": "“Kings Of Prohibition” Shiraz", "volume": "750 мл", "price": 4300, "type": "бутылка", "alcohol": 14.5, "description": "австралийский шираз, чёрный перец и джем", "tier": "премиум" },
  { "_id": 78, "category": "КРАСНЫЕ ВИНА", "name": "Showdown “The Unfaithful Messenger” Red Zinfandel", "volume": "125 мл / 750 мл", "price": "770 / 4700", "type": "бокал/бутылка", "alcohol": 14.5, "description": "калифорнийский зинфандель, мощный и джемовый", "tier": "премиум" }
]