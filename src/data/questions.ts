import { Question } from '../types/game';

export const QUESTIONS_DATABASE: Question[] = [
  // ==========================================
  // ENSINO FUNDAMENTAL - FÁCIL
  // ==========================================
  {
    id: 'ef-fac-1',
    title: 'A cor da caixa-preta dos aviões',
    text: 'A caixa-preta dos aviões é um dispositivo blindado pintado inteiramente de preto fosco para proteger os circuitos internos da luz solar.',
    classification: 'FAKE',
    alterationDetail: 'A cor real do equipamento foi alterada para preto.',
    explanation: 'Apesar de ser popularmente chamada de "caixa-preta", ela é pintada de cor laranja brilhante (laranja internacional) com faixas refletoras para facilitar sua rápida localização visual entre destroços e no fundo do mar.',
    originalOrCorrectedInfo: 'A caixa-preta não é preta; é pintada de laranja brilhante e altamente refletivo.',
    sourceName: 'Agência Nacional de Aviação Civil (ANAC) / BBC News',
    sourceUrl: 'https://www.anac.gov.br',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Tecnologia & Aviação'
  },
  {
    id: 'ef-fac-2',
    title: 'Visualização da Grande Muralha da China do espaço',
    text: 'Astronautas em órbita baixa da Terra conseguem enxergar a Grande Muralha da China com facilidade a olho nu através das janelas da estação espacial.',
    classification: 'FAKE',
    alterationDetail: 'Foi afirmado que é visível a olho nu do espaço, quando na realidade é imperceptível sem lentes de alta potência.',
    explanation: 'A NASA e astronautas de várias missões já confirmaram que a Grande Muralha da China não pode ser vista a olho nu da órbita terrestre. Ela é feita de materiais de cores muito semelhantes ao terreno ao redor e tem apenas alguns metros de largura.',
    originalOrCorrectedInfo: 'A Grande Muralha da China não é visível a olho nu da órbita espacial, segundo a NASA.',
    sourceName: 'NASA Earth Observatory',
    sourceUrl: 'https://earthobservatory.nasa.gov',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Espaço & Geografia'
  },
  {
    id: 'ef-fac-3',
    title: 'Baleia-azul e o tamanho de seu coração',
    text: 'O coração da baleia-azul adulta pode pesar cerca de 180 a 200 quilos, com dimensões comparáveis às de um carro pequeno ou carrinho de golfe.',
    classification: 'FATO',
    explanation: 'A baleia-azul é o maior animal que já existiu no planeta Terra. Em 2015, biólogos do Museu Real de Ontário recuperaram e preservaram um coração de baleia-azul intacto, comprovando que ele pesava 180 kg e tinha o volume similar ao de um veículo compacto.',
    originalOrCorrectedInfo: 'Informação autêntica confirmada por biólogos marinhos.',
    sourceName: 'Royal Ontario Museum / National Geographic',
    sourceUrl: 'https://www.nationalgeographic.com',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Biologia Animal'
  },
  {
    id: 'ef-fac-4',
    title: 'Camaleões e o motivo da mudança de cor',
    text: 'Os camaleões mudam a tonalidade de sua pele exclusivamente para se camuflar e se esconder de predadores no meio dos galhos.',
    classification: 'FAKE',
    alterationDetail: 'Foi atribuída a camuflagem como razão exclusiva, ignorando a comunicação social e temperatura.',
    explanation: 'A ciência já comprovou que a principal função da mudança de cor dos camaleões é a regulação térmica e a comunicação social (atrair parceiros, demonstrar agressividade ou estresse para rivais). A camuflagem é secundária.',
    originalOrCorrectedInfo: 'Camaleões mudam de cor principalmente para regular calor corporal e expressar humor ou mensagens a outros camaleões.',
    sourceName: 'Revista Nature / National Geographic Brasil',
    sourceUrl: 'https://www.nature.com',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Biologia Animal'
  },
  {
    id: 'ef-fac-5',
    title: 'Raios e o mesmo local de impacto',
    text: 'Um raio nunca atinge o mesmo ponto geográfico mais de uma vez durante a mesma tempestade ou ao longo de anos.',
    classification: 'FAKE',
    alterationDetail: 'O mito popular de que raios não caem no mesmo lugar foi reproduzido como regra física.',
    explanation: 'Raios buscam o caminho de menor resistência elétrica. Estruturas altas e pontiagudas, como o Cristo Redentor no Rio de Janeiro ou o Empire State Building em Nova York, são atingidas dezenas de vezes todos os anos.',
    originalOrCorrectedInfo: 'Raios caem sim no mesmo lugar repetidas vezes, especialmente em torres, árvores isoladas e monumentos.',
    sourceName: 'Instituto Nacional de Pesquisas Espaciais (INPE - ELAT)',
    sourceUrl: 'https://www.inpe.br/elat',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Física & Clima'
  },
  {
    id: 'ef-fac-6',
    title: 'Impressões digitais únicas de coalas',
    text: 'As pontas dos dedos dos coalas possuem impressões digitais tão parecidas com as humanas que até exames microscópicos de perícia criminal podem confundi-las.',
    classification: 'FATO',
    explanation: 'Pesquisadores da Universidade de Adelaide constataram que os coalas evoluíram dermatoglifos (impressões digitais) muito semelhantes aos dos humanos e chimpanzés para auxiliar na aderência ao subir em árvores de eucalipto.',
    originalOrCorrectedInfo: 'Fato comprovado pela anatomia comparada e medicina forense.',
    sourceName: 'University of Adelaide / BBC Science Focus',
    sourceUrl: 'https://www.sciencefocus.com',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Biologia Animal'
  },
  {
    id: 'ef-fac-7',
    title: 'Comer manga com leite faz mal à saúde',
    text: 'A mistura alimentar de manga fresca consumida simultaneamente com leite integral causa intoxicação alimentar grave e pode ser fatal.',
    classification: 'FAKE',
    alterationDetail: 'Um mito social brasileiro foi classificado como intoxicação real.',
    explanation: 'A mistura é totalmente nutritiva e inofensiva. A lenda foi criada no Brasil colonial pelos senhores de engenho para desencorajar as pessoas escravizadas de consumirem o leite das fazendas, já que as mangas eram abundantes nos pomares.',
    originalOrCorrectedInfo: 'Manga com leite é totalmente seguro e nutritivo; a história foi um boato colonial.',
    sourceName: 'Ministério da Saúde do Brasil / Fiocruz',
    sourceUrl: 'https://www.gov.br/saude',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Saúde & História'
  },
  {
    id: 'ef-fac-8',
    title: 'Sono dos golfinhos com metade do cérebro',
    text: 'Os golfinhos dormem mantendo um hemisfério do cérebro acordado e um dos olhos abertos para poderem continuar subindo à superfície para respirar.',
    classification: 'FATO',
    explanation: 'Os golfinhos praticam o sono uni-hemisférico de ondas lentas. Como são mamíferos e sua respiração é voluntária, se dormissem completamente como humanos, eles se afogariam no mar.',
    originalOrCorrectedInfo: 'Fato comprovado pela neurobiologia marinha.',
    sourceName: 'Instituto Baleia Jubarte / Scientific American Brasil',
    sourceUrl: 'https://www.scientificamerican.com',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Biologia Marinha'
  },

  // ==========================================
  // ENSINO FUNDAMENTAL - MÉDIO
  // ==========================================
  {
    id: 'ef-med-1',
    title: 'O sangue desoxigenado nas veias humanas',
    text: 'O sangue pobre em oxigênio que circula pelas veias humanas é de cor azul brilhante, tornando-se vermelho somente no momento em que entra em contato com o ar.',
    classification: 'FAKE',
    alterationDetail: 'A cor real do sangue venoso foi descrita como azul.',
    explanation: 'O sangue humano é sempre vermelho. Quando carregado de oxigênio é vermelho vivo; quando desoxigenado nas veias, é vermelho escuro ou bordô. As veias parecem azuladas através da pele por causa da reflexão e dispersão da luz nos tecidos cutâneos.',
    originalOrCorrectedInfo: 'O sangue humano nunca é azul; é sempre vermelho (claro ou escuro).',
    sourceName: 'Sociedade Brasileira de Hematologia e Hemoterapia (ABHH)',
    sourceUrl: 'https://abhh.com.br',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Ciência & Corpo Humano'
  },
  {
    id: 'ef-med-2',
    title: 'O voo histórico do 14-Bis de Santos Dumont',
    text: 'Em 23 de outubro de 1906, no Campo de Bagatelle em Paris, Alberto Santos Dumont realizou o primeiro voo público com um aparelho mais pesado que o ar a descolar por meios próprios.',
    classification: 'FATO',
    explanation: 'O 14-Bis percorreu 60 metros a quase 3 metros de altura perante uma multidão e a comissão oficial do Aeroclube da França, cumprindo as regras de autopropulsão sem trilhos, catapultas ou ventos contrários.',
    originalOrCorrectedInfo: 'Acontecimento histórico verificado e registrado oficialmente.',
    sourceName: 'Museu Aeroespacial / Força Aérea Brasileira (FAB)',
    sourceUrl: 'https://www.fab.mil.br',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'História & Invenções'
  },
  {
    id: 'ef-med-3',
    title: 'O sentido da água na descarga e o Efeito Coriolis',
    text: 'A força do movimento de rotação da Terra faz a água da privada girar no sentido horário no Brasil e anti-horário nos Estados Unidos.',
    classification: 'FAKE',
    alterationDetail: 'O efeito Coriolis foi aplicado a bacias de banheiro de escala minúscula.',
    explanation: 'A aceleração de Coriolis é real, mas sua intensidade em pequenas massas de água (como um vaso sanitário ou pia) é desprezível. O sentido do redemoinho da descarga depende exclusivamente da direção e inclinação dos jatos de água na cerâmica da bacia.',
    originalOrCorrectedInfo: 'Em privadas e pias, o formato do ralo e os jatos de água determinam o giro, não a rotação da Terra.',
    sourceName: 'Scientific American / Sociedade Brasileira de Física',
    sourceUrl: 'https://sbfisica.org.br',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Física do Cotidiano'
  },
  {
    id: 'ef-med-4',
    title: 'Comunicação e cooperação das abelhas',
    text: 'As abelhas realizam uma "dança do requebrado" (waggle dance) com movimentos precisos em forma de oito para indicar aos membros da colmeia a distância e a direção exata de flores.',
    classification: 'FATO',
    explanation: 'A descoberta foi feita pelo zoólogo Karl von Frisch, que recebeu o Prêmio Nobel de Medicina em 1973 por decifrar como o ângulo do corpo da abelha em relação ao sol e o tempo de vibração informam a coordenada do pólen.',
    originalOrCorrectedInfo: 'Fato comprovado pela etologia e premiado com o Nobel.',
    sourceName: 'Fundação Nobel / Revista Ciência Hoje',
    sourceUrl: 'https://www.nobelprize.org',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Biologia & Natureza'
  },
  {
    id: 'ef-med-5',
    title: 'Tempo de digestão de um chiclete engolido',
    text: 'Quando engolimos uma goma de mascar acidentalmente, ela permanece colada nas paredes do estômago por sete anos até ser digerida.',
    classification: 'FAKE',
    alterationDetail: 'O tempo de trânsito digestivo de 2 a 3 dias foi inflado absurdamente para 7 anos.',
    explanation: 'Embora a base sintética do chiclete não seja quebrada pelos ácidos estomacais, o sistema gastrointestinal a empurra através das contrações musculares (peristaltismo), sendo eliminada nas fezes normalmente em poucos dias.',
    originalOrCorrectedInfo: 'Chicletes engolidos não ficam 7 anos no corpo; são eliminados naturalmente em poucos dias.',
    sourceName: 'Mayo Clinic / Federação Brasileira de Gastroenterologia',
    sourceUrl: 'https://www.mayoclinic.org',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Saúde & Fisiologia'
  },
  {
    id: 'ef-med-6',
    title: 'A dilatação térmica da Torre Eiffel no verão',
    text: 'A Torre Eiffel em Paris pode ficar cerca de 15 centímetros mais alta durante os dias mais quentes do verão devido à expansão térmica do ferro.',
    classification: 'FATO',
    explanation: 'O ferro pudlado da Torre Eiffel se expande com o aumento de temperatura. No auge do calor parisiense, a estrutura metálica cresce verticalmente até 15 cm e se inclina levemente na direção oposta ao sol.',
    originalOrCorrectedInfo: 'Fato verificado pelos engenheiros responsáveis pelo monumento.',
    sourceName: 'Société d\'Exploitation de la Tour Eiffel (SETE)',
    sourceUrl: 'https://www.toureiffel.paris',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Física & Monumentos'
  },
  {
    id: 'ef-med-7',
    title: 'Visão dos morcegos no escuro',
    text: 'Morcegos são mamíferos totalmente desprovidos de visão (cegos), dependendo de forma absoluta e exclusiva da ecolocalização.',
    classification: 'FAKE',
    alterationDetail: 'A visão do animal foi declarada nula quando na verdade todos enxergam.',
    explanation: 'Nenhuma das mais de 1.400 espécies de morcegos é cega. Todos possuem olhos funcionais; muitas espécies que se alimentam de frutas ou néctar têm visão excelente adaptada à penumbra e distinguem cores no ultravioleta.',
    originalOrCorrectedInfo: 'Nenhum morcego é cego; eles enxergam e combinam visão com ecolocalização sonora.',
    sourceName: 'Bat Conservation International / National Geographic',
    sourceUrl: 'https://www.batcon.org',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Biologia Animal'
  },

  // ==========================================
  // ENSINO FUNDAMENTAL - DIFÍCIL
  // ==========================================
  {
    id: 'ef-dif-1',
    title: 'O maior deserto do planeta Terra',
    text: 'O deserto do Saara, localizado no norte da África, é o maior deserto do planeta Terra em extensão territorial.',
    classification: 'FAKE',
    alterationDetail: 'O Saara foi colocado como o maior de todos, ignorando a definição técnica de deserto que inclui os pólos.',
    explanation: 'Geograficamente, um deserto é definido por taxas mínimas de precipitação anual de água. A Antártica é o maior deserto da Terra, com cerca de 14 milhões de km², enquanto o Saara é o maior deserto quente, com cerca de 9 milhões de km².',
    originalOrCorrectedInfo: 'A Antártica é o maior deserto do mundo (deserto polar frio); o Saara é o maior deserto quente.',
    sourceName: 'USGS - United States Geological Survey / Guinness World Records',
    sourceUrl: 'https://www.usgs.gov',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'Geografia Física'
  },
  {
    id: 'ef-dif-2',
    title: 'Habitat geográfico de ursos polares e pinguins',
    text: 'Ursos polares e pinguins imperadores dividem o mesmo território de caça nas geleiras marinhas do Círculo Polar Ártico.',
    classification: 'FAKE',
    alterationDetail: 'Dois animais de polos opostos foram colocados no mesmo hemisfério.',
    explanation: 'Ursos polares vivem exclusivamente no hemisfério Norte (Ártico), enquanto os pinguins selvagens habitam o hemisfério Sul (Antártica, América do Sul e África do Sul). Na natureza, um urso polar e um pinguim nunca se encontram.',
    originalOrCorrectedInfo: 'Ursos polares vivem no polo Norte (Ártico) e pinguins nativos vivem no polo Sul (Antártica).',
    sourceName: 'World Wildlife Fund (WWF) / British Antarctic Survey',
    sourceUrl: 'https://www.worldwildlife.org',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'Geografia & Ecologia'
  },
  {
    id: 'ef-dif-3',
    title: 'Rede subterrânea de comunicação entre árvores',
    text: 'Árvores em florestas compartilham nutrientes e transmitem alertas químicos de ataques de insetos através de uma rede de fungos no solo chamada micorriza.',
    classification: 'FATO',
    explanation: 'Estudos pioneiros da ecologista Suzanne Simard revelaram que as raízes das árvores se conectam por redes fúngicas micorrízicas subterrâneas (apelidadas de "Wood Wide Web"), trocando carbono, água, fósforo e moléculas sinalizadoras.',
    originalOrCorrectedInfo: 'Comprovado por publicações científicas na revista Nature.',
    sourceName: 'Nature / University of British Columbia',
    sourceUrl: 'https://www.nature.com',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'Botânica & Ecologia'
  },
  {
    id: 'ef-dif-4',
    title: 'A cor original da Estátua da Liberdade',
    text: 'A Estátua da Liberdade em Nova York sempre ostentou a cor verde-claro desde sua entrega pela França em 1886, pois suas placas de cobre foram pintadas de verde antes do transporte.',
    classification: 'FAKE',
    alterationDetail: 'Afirmou-se que a cor verde veio de tinta original, e não de oxidação química.',
    explanation: 'A estátua era originalmente do tom marrom-avermelhado brilhante do cobre metálico puro. Ao longo de cerca de 30 anos exposta ao ar úmido e à poluição de Nova York, o cobre oxidou naturalmente, formando a camada protetora de pátina verde.',
    originalOrCorrectedInfo: 'A Estátua da Liberdade era marrom acobreada; ficou verde pela oxidação natural do cobre.',
    sourceName: 'National Park Service dos EUA (NPS)',
    sourceUrl: 'https://www.nps.gov/stli',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'Química & História'
  },
  {
    id: 'ef-dif-5',
    title: 'A órbita rápida da Estação Espacial Internacional',
    text: 'A Estação Espacial Internacional (ISS) viaja a cerca de 28.000 km/h e completa uma volta inteira ao redor do planeta Terra a cada 90 minutos aproximadamente.',
    classification: 'FATO',
    explanation: 'A cerca de 400 km de altitude, para permanecer em órbita sem cair de volta à Terra pela gravidade, a ISS mantém essa impressionante velocidade orbital, permitindo que os astronautas a bordo assistam a cerca de 16 pores e nasceres do sol todos os dias.',
    originalOrCorrectedInfo: 'Fato medido continuamente pelas agências espaciais NASA, ESA e Roscosmos.',
    sourceName: 'NASA Space Operations',
    sourceUrl: 'https://www.nasa.gov/station',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'Astronomia & Física'
  },
  {
    id: 'ef-dif-6',
    title: 'Cleópatra, a Pizza e as Pirâmides de Gizé',
    text: 'Em termos de linha do tempo histórica, a rainha egípcia Cleópatra viveu mais próxima cronologicamente do primeiro pouso na Lua do que da construção das Grandes Pirâmides de Gizé.',
    classification: 'FATO',
    explanation: 'A Grande Pirâmide de Gizé foi construída por volta de 2560 a.C. Cleópatra viveu por volta de 30 a.C. (um intervalo de cerca de 2.500 anos). A missão Apollo 11 pousou na Lua em 1969 d.C. (cerca de 2.000 anos depois de Cleópatra). Logo, ela viveu mais perto da era espacial.',
    originalOrCorrectedInfo: 'Fato cronológico matemático verificado por historiadores e egiptólogos.',
    sourceName: 'The British Museum / Smithsonian Magazine',
    sourceUrl: 'https://www.smithsonianmag.com',
    educationLevel: 'fundamental',
    difficulty: 'dificil',
    category: 'História Geral'
  },

  // ==========================================
  // ENSINO MÉDIO - FÁCIL
  // ==========================================
  {
    id: 'em-fac-1',
    title: 'O pulmão do mundo e o oxigênio atmosférico',
    text: 'A Floresta Amazônica produz sozinha cerca de 80% de todo o oxigênio respirável da atmosfera do planeta Terra.',
    classification: 'FAKE',
    alterationDetail: 'A porcentagem foi inflada para 80%, desconsiderando a respiração da própria floresta e o papel dos oceanos.',
    explanation: 'A Amazônia é essencial para o clima e a biodiversidade, mas quase todo o oxigênio gerado pelo dia na fotossíntese é consumido à noite pela respiração de suas próprias plantas e animais. Os maiores produtores líquidos de oxigênio do planeta são o fitoplâncton e as algas dos oceanos.',
    originalOrCorrectedInfo: 'A Amazônia não produz 80% do oxigênio líquido; os fitoplânctons oceânicos geram a maioria do saldo de O2.',
    sourceName: 'Instituto Nacional de Pesquisas Espaciais (INPE) / NASA Earth',
    sourceUrl: 'https://www.inpe.br',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Ecologia & Biologia'
  },
  {
    id: 'em-fac-2',
    title: 'O mito dos 10% de uso do cérebro humano',
    text: 'Pesquisas contemporâneas de neurociência comprovam que os seres humanos utilizam rotineiramente apenas 10% da capacidade total do cérebro.',
    classification: 'FAKE',
    alterationDetail: 'Um mito de autoajuda foi apresentado como conclusão de neuroimagem moderna.',
    explanation: 'Imagens por Ressonância Magnética Funcional (fMRI) e tomografias por emissão de pósitrons revelam que praticamente 100% do cérebro humano tem funções ativas ao longo do dia, até mesmo durante o repouso e o sono profundo.',
    originalOrCorrectedInfo: 'O cérebro é utilizado em sua quase totalidade; o mito dos 10% é desinformação neurológica.',
    sourceName: 'Scientific American / Sociedade Brasileira de Neurociências',
    sourceUrl: 'https://www.scientificamerican.com',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Neurociência'
  },
  {
    id: 'em-fac-3',
    title: 'A primeira programadora de computadores da história',
    text: 'Em 1843, a matemática britânica Ada Lovelace publicou o primeiro algoritmo destinado a ser processado por uma máquina mecânica (a Máquina Analítica de Babbage).',
    classification: 'FATO',
    explanation: 'Ao traduzir e anotar um artigo sobre a máquina de Charles Babbage, Lovelace incluiu um algoritmo para o cálculo dos números de Bernoulli, sendo universalmente reconhecida como a primeira pessoa a programar computadores.',
    originalOrCorrectedInfo: 'Fato histórico documentado e celebrado mundialmente na computação.',
    sourceName: 'Computer History Museum / University of Oxford',
    sourceUrl: 'https://computerhistory.org',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Tecnologia & História'
  },
  {
    id: 'em-fac-4',
    title: 'Vacinas e desinformação sobre microchips 5G',
    text: 'Vacinas contra doenças infecciosas contêm microchips subcutâneos de grafeno ativados por radiofrequência 5G para rastreamento governamental.',
    classification: 'FAKE',
    alterationDetail: 'Teoria da conspiração amplamente espalhada em redes sociais.',
    explanation: 'Vacinas são compostas biológicas de antígenos atenuados, inativados ou RNA mensageiro, estabilizadores e sais minerais. Não existem componentes eletrônicos, baterias ou circuitos integrados capazes de funcionar em soluções líquidas de vacina.',
    originalOrCorrectedInfo: 'Vacinas não contêm circuitos ou chips; tratou-se de uma fake news perigosa para a saúde pública.',
    sourceName: 'Agência Nacional de Vigilância Sanitária (Anvisa) / Organização Mundial da Saúde (OMS)',
    sourceUrl: 'https://www.gov.br/anvisa',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Saúde & Educação Midiática'
  },
  {
    id: 'em-fac-5',
    title: 'Compartilhamento genético entre humanos e bananas',
    text: 'Seres humanos e bananas compartilham aproximadamente 50% a 60% dos mesmos genes responsáveis pelas funções metabólicas celulares básicas.',
    classification: 'FATO',
    explanation: 'Como todos os seres vivos da Terra compartilham um ancestral comum original (LUCA), os genes que codificam proteínas celulares fundamentais (como replicação de DNA, respiração celular e divisão) são conservados ao longo de bilhões de anos de evolução.',
    originalOrCorrectedInfo: 'Fato genético confirmado pelo National Human Genome Research Institute.',
    sourceName: 'National Human Genome Research Institute (NHGRI)',
    sourceUrl: 'https://www.genome.gov',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Genética & Evolução'
  },
  {
    id: 'em-fac-6',
    title: 'O vidro de catedrais medievais e o mito do líquido',
    text: 'O vidro de janelas de catedrais medievais é mais espesso na base porque o vidro é um líquido de alta viscosidade que escorre lentamente para baixo ao longo dos séculos.',
    classification: 'FAKE',
    alterationDetail: 'Uma imperfeição do processo de fabricação foi explicada erroneamente como fluxo de líquido.',
    explanation: 'O vidro é um sólido amorfo, cuja estrutura molecular não flui à temperatura ambiente mesmo em milênios. A base mais grossa nas catedrais antigas ocorreu porque vidreiros medievais usavam o método de sopro em disco e montavam o lado mais pesado embaixo para dar estabilidade.',
    originalOrCorrectedInfo: 'O vidro não escorre à temperatura ambiente; a espessura se deve à técnica artesanal de sopro medieval.',
    sourceName: 'American Chemical Society (ACS) / Corning Museum of Glass',
    sourceUrl: 'https://www.acs.org',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Física & Materiais'
  },
  {
    id: 'em-fac-7',
    title: 'A recuperação da Camada de Ozônio com o Protocolo de Montreal',
    text: 'A camada de ozônio na estratosfera está em processo consistente de recuperação graças à proibição internacional dos gases clorofluorocarbonetos (CFCs) em 1987.',
    classification: 'FATO',
    explanation: 'Relatórios científicos periódicos da ONU e da OMM atestam que, mantidas as regras do Protocolo de Montreal, a camada de ozônio sobre a maior parte do globo deve se recuperar aos níveis de 1980 até cerca de 2040 e sobre a Antártica até 2066.',
    originalOrCorrectedInfo: 'Fato comprovado por medições satelitais da NASA, ESA e ONU.',
    sourceName: 'Programa das Nações Unidas para o Meio Ambiente (PNUMA) / OMM',
    sourceUrl: 'https://www.unep.org',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Meio Ambiente & Geopolítica'
  },

  // ==========================================
  // ENSINO MÉDIO - MÉDIO
  // ==========================================
  {
    id: 'em-med-1',
    title: 'A posição orbital do Telescópio Espacial James Webb',
    text: 'O Telescópio Espacial James Webb orbita a Terra na órbita baixa a cerca de 450 km de altitude, ao lado do Telescópio Hubble.',
    classification: 'FAKE',
    alterationDetail: 'A localização orbital foi trocada da posição L2 para a órbita terrestre baixa do Hubble.',
    explanation: 'O Hubble sim orbita a Terra a ~540 km. O James Webb, por sua vez, está a 1,5 milhão de quilômetros de distância da Terra, no Ponto de Lagrange L2 do sistema Sol-Terra, onde opera em frio extremo para captar luz infravermelha.',
    originalOrCorrectedInfo: 'O James Webb não orbita a Terra; orbita o Ponto de Lagrange L2 a 1,5 milhão de km da Terra.',
    sourceName: 'NASA / Agência Espacial Europeia (ESA)',
    sourceUrl: 'https://webb.nasa.gov',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Astrofísica & Exploração Espacial'
  },
  {
    id: 'em-med-2',
    title: 'A invenção da lâmpada incandescente por Thomas Edison',
    text: 'Thomas Edison inventou a primeira lâmpada elétrica funcional da história em 1879, sendo o pioneiro absoluto a produzir luz a partir de filamentos elétricos.',
    classification: 'FAKE',
    alterationDetail: 'Edison foi creditado como o criador pioneiro da ideia, apagando inventores anteriores.',
    explanation: 'Mais de 20 inventores já haviam patenteado lâmpadas antes de Edison, incluindo Humphry Davy, Warren de la Rue e o britânico Joseph Swan. O mérito de Edison foi aperfeiçoar o filamento de carbono em alto vácuo e criar um sistema elétrico comercialmente prático.',
    originalOrCorrectedInfo: 'Edison aperfeiçoou e comercializou a lâmpada, mas não foi seu primeiro inventor histórico.',
    sourceName: 'Smithsonian National Museum of American History / IEEE',
    sourceUrl: 'https://americanhistory.si.edu',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'História da Ciência'
  },
  {
    id: 'em-med-3',
    title: 'O Aquífero Alter do Chão e a água doce no Brasil',
    text: 'Sob a Bacia Amazônica localiza-se o Sistema Aquífero Grande Amazônia (SAGA), considerado o maior aquífero subterrâneo em volume de água doce potável do planeta.',
    classification: 'FATO',
    explanation: 'Pesquisas da Universidade Federal do Pará (UFPA) confirmaram que o sistema Alter do Chão/SAGA possui reservas estimadas em mais de 160 trilhões de metros cúbicos de água doce, superando o Aquífero Guarani em volume.',
    originalOrCorrectedInfo: 'Fato hidrogeológico comprovado por pesquisas geológicas brasileiras.',
    sourceName: 'Serviço Geológico do Brasil (CPRM) / Agência Nacional de Águas (ANA)',
    sourceUrl: 'https://www.sgb.gov.br',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Geografia & Hidrologia'
  },
  {
    id: 'em-med-4',
    title: 'Albert Einstein e o mito do fracasso em matemática',
    text: 'Albert Einstein era um aluno medíocre no ensino fundamental e foi reprovado nos exames básicos de matemática em sua infância na Alemanha.',
    classification: 'FAKE',
    alterationDetail: 'O desempenho escolar de Einstein foi falsificado para alimentar um mito motivacional popular.',
    explanation: 'Quando questionado sobre esse boato em vida, o próprio Einstein riu e esclareceu: "Nunca fui reprovado em matemática. Antes dos quinze anos já dominava o cálculo diferencial e integral". Seus boletins na Suíça mostravam nota máxima (6) em álgebra e geometria.',
    originalOrCorrectedInfo: 'Einstein sempre foi brilhante em matemática e dominava cálculo avançado ainda adolescente.',
    sourceName: 'Albert Einstein Archives / Hebrew University of Jerusalem',
    sourceUrl: 'https://albert-einstein.org',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'História & Educação'
  },
  {
    id: 'em-med-5',
    title: 'A origem do oxigênio na atmosfera da Terra',
    text: 'O oxigênio gasoso em grande quantidade na atmosfera da Terra originou-se há cerca de 2,4 bilhões de anos pela atividade fotossintética de cianobactérias nos mares primitivos.',
    classification: 'FATO',
    explanation: 'Esse evento biogeoquímico é conhecido como o "Grande Evento de Oxigenação". Antes das cianobactérias produzirem oxigênio molecular como subproduto, a atmosfera da Terra era rica em metano, dióxido de carbono e amônia, quase sem oxigênio livre.',
    originalOrCorrectedInfo: 'Fato geobiológico fundamental comprovado pelo registro fóssil e estratigrafia mineral.',
    sourceName: 'Nature Geoscience / USP Instituto de Geociências',
    sourceUrl: 'https://www.igc.usp.br',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Geociências & Evolução'
  },
  {
    id: 'em-med-6',
    title: 'Tubarões e a suposta imunidade ao câncer',
    text: 'O sistema imunológico dos tubarões é geneticamente incapaz de desenvolver qualquer tipo de neoplasia, motivo pelo qual nunca têm câncer.',
    classification: 'FAKE',
    alterationDetail: 'Uma alegação de imunidade absoluta foi forjada para vender suplementos de cartilagem de tubarão.',
    explanation: 'Cientistas já documentaram mais de 40 casos de tumores benignos e malignos em tubarões e raias, inclusive câncer de pele e tumores na própria cartilagem. O mito foi amplamente promovido na década de 1990 para comercializar pílulas de cartilagem de tubarão sem eficácia médica.',
    originalOrCorrectedInfo: 'Tubarões podem desenvolver tumores e ter câncer como outros vertebrados.',
    sourceName: 'American Cancer Society / Johns Hopkins Medicine',
    sourceUrl: 'https://www.cancer.org',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Medicina & Zoologia'
  },
  {
    id: 'em-med-7',
    title: 'A tecnologia de cancelamento de ruído em fones',
    text: 'Fones com cancelamento de ruído ativo funcionam emitindo ondas sonoras com fase invertida (interferência destrutiva) para anular sons do ambiente.',
    classification: 'FATO',
    explanation: 'Microfones externos captam o som ambiente, um processador calcula uma onda sonora com a mesma amplitude e fase invertida em 180 graus. Quando as duas ondas acústicas se somam no canal auditivo, elas se anulam por física ondulatória.',
    originalOrCorrectedInfo: 'Princípio ondulatório de interferência acústica destrutiva aplicado à engenharia de áudio.',
    sourceName: 'Acoustical Society of America / MIT Technology Review',
    sourceUrl: 'https://acousticalsociety.org',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Física & Tecnologia'
  },

  // ==========================================
  // ENSINO MÉDIO - DIFÍCIL
  // ==========================================
  {
    id: 'em-dif-1',
    title: 'O maior organismo vivo clonal do planeta',
    text: 'O maior organismo vivo do planeta em extensão e biomassa é a sequoia-gigante General Sherman, localizada na Califórnia.',
    classification: 'FAKE',
    alterationDetail: 'A sequoia foi indicada como o maior organismo biológico em área, ignorando fungos clonais subterrâneos.',
    explanation: 'O General Sherman é a maior árvore individual em volume de tronco, mas o maior organismo vivo do planeta em área contínua é o fungo *Armillaria ostoyae* na Floresta Nacional de Malheur, no Oregon. Trata-se de uma única colônia clonal subterrânea de 9,6 km² com milhares de anos.',
    originalOrCorrectedInfo: 'O maior organismo em área é uma rede de fungo subterrâneo no Oregon (quase 10 km²), e não uma árvore.',
    sourceName: 'United States Forest Service (USFS) / Scientific American',
    sourceUrl: 'https://www.fs.usda.gov',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Biologia & Micologia'
  },
  {
    id: 'em-dif-2',
    title: 'A cor real da luz emitida pelo Sol no vácuo',
    text: 'No espaço sideral, fora do filtro da atmosfera terrestre, a luz solar visível emitida diretamente pela nossa estrela é branca.',
    classification: 'FATO',
    explanation: 'O Sol emite radiação eletromagnética em todo o espectro visível com intensidades semelhantes. Visto do espaço, ele é de um branco puro. O Sol parece amarelo ou alaranjado na Terra porque as moléculas da nossa atmosfera dispersam as ondas azuis de comprimento mais curto (Dispersão de Rayleigh).',
    originalOrCorrectedInfo: 'Comprovado por astronautas e instrumentos espectrais espaciais da NASA.',
    sourceName: 'NASA Solar Physics / Stanford Solar Center',
    sourceUrl: 'http://solar-center.stanford.edu',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Astrofísica & Óptica'
  },
  {
    id: 'em-dif-3',
    title: 'A diferença histórica entre Internet e World Wide Web',
    text: 'A Internet e a World Wide Web (WWW) foram criadas na mesma data e pelo mesmo cientista no laboratório CERN em 1989.',
    classification: 'FAKE',
    alterationDetail: 'Confundiu a rede física de transmissão de pacotes (Internet) com a aplicação de hipertexto (Web).',
    explanation: 'A Internet (infraestrutura de rede TCP/IP) começou a operar com a ARPANET no final dos anos 1960 pelo Departamento de Defesa dos EUA. A Web (WWW) foi inventada duas décadas depois, em 1989, pelo britânico Tim Berners-Lee no CERN, como um sistema para visualização de documentos em hipertexto.',
    originalOrCorrectedInfo: 'A Internet (infraestrutura) surgiu nos anos 1960/70; a Web (sistema de páginas HTTP/HTML) foi criada em 1989.',
    sourceName: 'CERN - European Organization for Nuclear Research / W3C',
    sourceUrl: 'https://home.cern/science/computing/birth-web',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'História da Computação'
  },
  {
    id: 'em-dif-4',
    title: 'Cenouras e a propaganda de guerra do radar britânico',
    text: 'A crença popular de que comer muita cenoura faz os olhos humanos enxergarem no escuro surgiu como propaganda do governo britânico na 2ª Guerra para esconder a invenção do radar aéreo.',
    classification: 'FATO',
    explanation: 'Durante a Batalha da Grã-Bretanha em 1940, a Força Aérea Britânica (RAF) usava um novo radar secreto nos aviões para abater caças alemães à noite. Para não revelar aos nazistas a existência do radar, o Ministério da Informação espalhou nos jornais que seus pilotos comiam cenouras em excesso para enxergar no escuro.',
    originalOrCorrectedInfo: 'Fato histórico militar documentado pelos Arquivos Nacionais Britânicos.',
    sourceName: 'Imperial War Museums (IWM) / Smithsonian Magazine',
    sourceUrl: 'https://www.iwm.org.uk',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'História & Guerra Psicológica'
  },
  {
    id: 'em-dif-5',
    title: 'O crescimento anual em altura do Monte Everest',
    text: 'O Monte Everest na cordilheira do Himalaia continua a crescer entre 4 a 5 milímetros por ano devido à colisão contínua da placa tectônica Indiana contra a placa Euroasiática.',
    classification: 'FATO',
    explanation: 'A placa indiana continua se movendo para o norte a uma taxa de cerca de 5 centímetros por ano, empurrando as montanhas para cima. Medições conjuntas do Nepal e da China em 2020 via satélites GPS e Beidou confirmaram a dinâmica tectônica ativa.',
    originalOrCorrectedInfo: 'Fato geológico medido com estações geodésicas de alta precisão.',
    sourceName: 'National Geographic Society / Department of Survey of Nepal',
    sourceUrl: 'https://www.nationalgeographic.org',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Geologia & Tectônica'
  },
  {
    id: 'em-dif-6',
    title: 'A precisão dos Relógios Atômicos de Césio',
    text: 'Os melhores relógios atômicos de césio e de rede óptica modernos demoram centenas de milhões de anos para adiantar ou atrasar um único segundo.',
    classification: 'FATO',
    explanation: 'Esses instrumentos medem as oscilações quânticas dos elétrons nos átomos (no átomo de césio-133 são 9.192.631.770 ciclos por segundo). Eles definem o tempo padrão internacional (UTC) e são essenciais para o funcionamento preciso dos sistemas de satélite GPS.',
    originalOrCorrectedInfo: 'Fato físico que fundamenta a definição moderna de tempo do Sistema Internacional de Unidades.',
    sourceName: 'NIST - National Institute of Standards and Technology / BIPM',
    sourceUrl: 'https://www.nist.gov',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Física Moderna'
  },

  // ==========================================
  // NOVAS PERGUNTAS ADICIONADAS
  // ==========================================
  {
    id: 'pergunta-01-caixa-preta',
    title: 'A caixa-preta dos aviões é realmente preta?',
    text: 'Os equipamentos conhecidos como caixas-pretas, responsáveis por registrar informações importantes dos voos, são pintados de preto.',
    classification: 'FAKE',
    alterationDetail: 'A cor real do equipamento foi alterada para preto.',
    explanation: 'Apesar do nome, os gravadores de voo são geralmente pintados de laranja intenso. Essa cor facilita sua localização em caso de acidentes.',
    originalOrCorrectedInfo: 'A caixa-preta não é preta; os gravadores de voo são geralmente pintados de laranja intenso para facilitar sua localização em caso de acidentes.',
    sourceName: 'Globo Ciência',
    sourceUrl: 'https://redeglobo.globo.com/globociencia/noticia/2012/05/conheca-algumas-das-curiosidades-mais-comuns-do-mundo-da-aviacao.html',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Curiosidades & Aviação'
  },
  {
    id: 'pergunta-02-tardigrados-espaco',
    title: 'Um animal microscópico conseguiu sobreviver ao vácuo do espaço?',
    text: 'Tardígrados, pequenos animais com menos de um milímetro, sobreviveram durante dez dias expostos ao vácuo do espaço e voltaram à atividade após receberem água.',
    classification: 'FATO',
    explanation: 'A informação é verdadeira. Durante a missão FOTON-M3, em 2007, tardígrados foram expostos às condições do espaço. Parte deles sobreviveu e voltou à atividade após a reidratação.',
    originalOrCorrectedInfo: 'Tardígrados sobreviveram por 10 dias expostos às condições do vácuo espacial na missão FOTON-M3 (2007) e reativaram suas funções biológicas após a reidratação.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/curiosidades/cientistas-intrigados-um-animal-de-menos-de-1-milimetro-sobreviveu-exposto-ao-vacuo-do-espaco-por-10-dias-e-voltou-a-vida-depois-de-ser-reidratado/',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Biologia & Espaço'
  },
  {
    id: 'pergunta-03-tardigrados-dez-meses',
    title: 'Tardígrados sobreviveram durante dez meses no espaço?',
    text: 'Cientistas enviaram pequenos tardígrados ao espaço, onde os animais permaneceram expostos ao vácuo durante dez meses antes de retornarem à Terra.',
    classification: 'FAKE',
    alterationDetail: 'O tempo real de exposição no experimento espacial (10 dias) foi alterado para 10 meses.',
    explanation: 'A notícia é baseada em um experimento real, mas apresenta uma alteração no tempo de exposição. Segundo a reportagem, os tardígrados ficaram expostos ao vácuo do espaço durante dez dias, e não dez meses.',
    originalOrCorrectedInfo: 'Os tardígrados ficaram expostos ao vácuo do espaço durante dez dias, e não dez meses.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/curiosidades/cientistas-intrigados-um-animal-de-menos-de-1-milimetro-sobreviveu-exposto-ao-vacuo-do-espaco-por-10-dias-e-voltou-a-vida-depois-de-ser-reidratado/',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Biologia & Espaço'
  },
  {
    id: 'pergunta-04-marsupial-rio',
    title: 'Uma nova espécie de marsupial foi descoberta no estado do Rio de Janeiro?',
    text: 'Pesquisadores e estudantes da Universidade Federal do Rio de Janeiro descreveram uma nova espécie de pequeno marsupial encontrada na Mata Atlântica fluminense.',
    classification: 'FATO',
    explanation: 'A espécie foi identificada como Monodelphis semilineata, conhecida como cuíca-de-três-listras-do-Rio de Janeiro. A descoberta foi publicada no Journal of Mammalogy.',
    originalOrCorrectedInfo: 'A espécie Monodelphis semilineata (cuíca-de-três-listras-do-Rio de Janeiro) foi identificada e descrita por pesquisadores da UFRJ na Mata Atlântica do Rio de Janeiro.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/ciencia/pequeno-e-raro-novo-marsupial-e-descoberto-no-rio-apos-milhoes-de-anos/',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Biodiversidade & Zoologia'
  },
  {
    id: 'pergunta-05-marsupial-amazonia',
    title: 'Uma nova espécie de marsupial foi descoberta na Amazônia?',
    text: 'Pesquisadores de uma universidade brasileira identificaram uma nova espécie de marsupial na região amazônica, durante estudos sobre a biodiversidade brasileira.',
    classification: 'FAKE',
    alterationDetail: 'O bioma e estado da descoberta foram alterados da Mata Atlântica fluminense para a Amazônia.',
    explanation: 'A notícia foi baseada em uma descoberta científica real, mas o local foi alterado. A espécie Monodelphis semilineata foi descrita a partir de exemplares encontrados no estado do Rio de Janeiro, na Mata Atlântica, e não na Amazônia.',
    originalOrCorrectedInfo: 'A espécie Monodelphis semilineata foi encontrada na Mata Atlântica do estado do Rio de Janeiro, e não na Amazônia.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/ciencia/pequeno-e-raro-novo-marsupial-e-descoberto-no-rio-apos-milhoes-de-anos/',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Biodiversidade & Geografia'
  },
  {
    id: 'pergunta-06-tectitos-brasil',
    title: 'Cientistas encontraram no Brasil um material de origem extraterrestre?',
    text: 'Pesquisadores identificaram fragmentos de vidro conhecidos como tectitos em uma extensa região entre Minas Gerais e Piauí. O material teria se formado após o impacto de um objeto vindo do espaço há aproximadamente seis milhões de anos.',
    classification: 'FATO',
    explanation: 'Pesquisadores da Unicamp estudaram o material e confirmaram sua origem relacionada a um impacto extraterrestre. A descoberta representa o primeiro registro comprovado desse tipo de material na América do Sul.',
    originalOrCorrectedInfo: 'Pesquisadores da Unicamp confirmaram a descoberta inédita na América do Sul de fragmentos de tectito (vidro gerado por impacto extraterrestre) entre Minas Gerais e Piauí.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/ciencia/vidro-extraterrestre-e-encontrado-no-brasil-entenda-descoberta-inedita/',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Geologia & Astronomia'
  },
  {
    id: 'pergunta-07-cratera-impacto-brasil',
    title: 'Cientistas encontraram e confirmaram uma enorme cratera de impacto no Brasil?',
    text: 'Após descobrir fragmentos de vidro extraterrestre entre Minas Gerais e Piauí, pesquisadores também identificaram e confirmaram a localização da cratera deixada pelo impacto do objeto espacial.',
    classification: 'FAKE',
    alterationDetail: 'Afirmou-se que a localização da cratera de impacto foi identificada e confirmada, o que não ocorreu.',
    explanation: 'A descoberta dos fragmentos de vidro é verdadeira, mas a existência de uma cratera não foi comprovada. Os pesquisadores identificaram vestígios do material, mas ainda seriam necessários novos estudos para confirmar uma possível cratera.',
    originalOrCorrectedInfo: 'Apenas os fragmentos de tectito foram encontrados e confirmados; a localização e comprovação de uma cratera de impacto ainda não ocorreram.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/ciencia/vidro-extraterrestre-e-encontrado-no-brasil-entenda-descoberta-inedita/',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Geologia & Astronomia'
  },
  {
    id: 'pergunta-08-goleiro-fabio-recorde',
    title: 'Um goleiro brasileiro se tornou o jogador com mais partidas oficiais da história do futebol?',
    text: 'O goleiro Fábio, do Fluminense, alcançou 1.391 partidas oficiais e superou o recorde anterior do inglês Peter Shilton.',
    classification: 'FATO',
    explanation: 'Segundo o levantamento publicado pelo ge em agosto de 2025, Fábio chegou a 1.391 jogos oficiais, superando a marca de 1.390 atribuída a Peter Shilton.',
    originalOrCorrectedInfo: 'O goleiro brasileiro Fábio alcançou 1.391 jogos oficiais, tornando-se o recordista mundial de partidas na história do futebol perante o levantamento do ge.',
    sourceName: 'ge',
    sourceUrl: 'https://ge.globo.com/google/amp/futebol/times/fluminense/noticia/2025/08/19/fabio-se-isola-como-recordista-de-jogos-da-historia-do-futebol-mundial.ghtml',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Esportes & Recordes'
  },
  {
    id: 'pergunta-09-fabio-apenas-fluminense',
    title: 'Fábio disputou mais de 1.390 partidas apenas pelo Fluminense?',
    text: 'O goleiro Fábio, do Fluminense, alcançou a marca de 1.391 partidas oficiais, todas defendendo o clube carioca.',
    classification: 'FAKE',
    alterationDetail: 'Afirmou-se que todas as partidas do recorde foram disputadas pelo Fluminense, desconsiderando os outros três clubes.',
    explanation: 'Fábio realmente alcançou 1.391 partidas oficiais na carreira, mas não disputou todas pelo Fluminense. Segundo o levantamento do ge, naquela contagem ele tinha 976 jogos pelo Cruzeiro, 235 pelo Fluminense, 150 pelo Vasco e 30 pelo União Bandeirante.',
    originalOrCorrectedInfo: 'As 1.391 partidas foram distribuídas entre Cruzeiro (976), Fluminense (235), Vasco (150) e União Bandeirante (30), e não todas pelo Fluminense.',
    sourceName: 'ge',
    sourceUrl: 'https://ge.globo.com/google/amp/futebol/times/fluminense/noticia/2025/08/19/fabio-se-isola-como-recordista-de-jogos-da-historia-do-futebol-mundial.ghtml',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Esportes & Recordes'
  },
  {
    id: 'pergunta-10-messi-recorde-mls',
    title: 'Messi estabeleceu um recorde na Major League Soccer ao marcar múltiplos gols em quatro jogos consecutivos?',
    text: 'Lionel Messi se tornou o primeiro jogador da história da MLS a marcar mais de um gol em quatro partidas consecutivas.',
    classification: 'FATO',
    explanation: 'Em julho de 2025, Messi alcançou essa marca pelo Inter Miami. O argentino marcou dois gols em cada uma das quatro partidas consecutivas mencionadas pela reportagem do ge.',
    originalOrCorrectedInfo: 'Lionel Messi tornou-se o primeiro atleta na história da MLS a marcar múltiplos gols em quatro partidas consecutivas pelo Inter Miami.',
    sourceName: 'ge',
    sourceUrl: 'https://ge.globo.com/futebol/futebol-internacional/mls/noticia/2025/07/10/messi-bate-novo-recorde-da-mls-por-marcar-gols-em-jogos-consecutivos.ghtml',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Esportes & Futebol'
  },

  // ==========================================
  // NOTÍCIAS DE GRANDES PORTAIS BRASILEIROS (G1, UOL, Folha, Estadão, etc.)
  // ==========================================
  {
    id: 'br-01-dino-banguela',
    title: 'Fóssil inédito de dinossauro sem dentes descoberto no Brasil',
    text: 'Cientistas brasileiros identificaram uma nova espécie de dinossauro fóssil no Paraná chamada Berthasaura leopoldinae, que se destacou por não possuir nenhum dente na mandíbula.',
    classification: 'FATO',
    explanation: 'Pesquisadores do Museu Nacional/UFRJ e da Universidade do Contestado descreveram o Berthasaura leopoldinae. O fóssil quase completo do período Cretáceo revelou um dinossauro bípede de 1 metro que possuía bico córneo desprovido de dentes.',
    originalOrCorrectedInfo: 'Fato comprovado por artigo na Nature Scientific Reports e amplamente divulgado pelo G1.',
    sourceName: 'G1',
    sourceUrl: 'https://g1.globo.com/ciencia/noticia/2021/11/18/cientistas-descobrem-nova-especie-de-dinossauro-banguela-que-viveu-no-parana.ghtml',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Paleontologia & Ciência'
  },
  {
    id: 'br-02-boldo-dengue',
    title: 'Chá de boldo como cura da dengue em 24 horas',
    text: 'O consumo de infusão concentrada de chá de boldo com limão elimina a carga viral da dengue do organismo humano em menos de 24 horas.',
    classification: 'FAKE',
    alterationDetail: 'Uma receita caseira popular sem comprovação clínica foi promovida como cura viral imediata.',
    explanation: 'O Ministério da Saúde e a Sociedade Brasileira de Infectologia reiteram que não existe antiviral caseiro para curar dengue em 24 horas. O tratamento essencial consiste em hidratação vigorosa sob acompanhamento médico.',
    originalOrCorrectedInfo: 'Chá de boldo não cura dengue; o tratamento correto é hidratação abundante orientada por profissionais de saúde.',
    sourceName: 'Agência Lupa',
    sourceUrl: 'https://lupa.uol.com.br',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Saúde Pública'
  },
  {
    id: 'br-03-itaipu-energia',
    title: 'A Usina Hidrelétrica de Itaipu Binacional',
    text: 'A usina de Itaipu Binacional, situada na fronteira entre Brasil e Paraguai no Rio Paraná, é uma das maiores geradoras de energia limpa e renovável do planeta.',
    classification: 'FATO',
    explanation: 'Com 14.000 MW de potência instalada em 20 unidades geradoras, Itaipu Binacional é um marco da engenharia civil e historicamente disputa a liderança mundial de geração anual acumulada de eletricidade hidrelétrica.',
    originalOrCorrectedInfo: 'Fato verificado pelos relatórios operacionais da Aneel e da Itaipu Binacional.',
    sourceName: 'UOL Notícias',
    sourceUrl: 'https://noticias.uol.com.br',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Geografia & Energia'
  },
  {
    id: 'br-04-urnas-internet',
    title: 'Conexão das urnas eletrônicas à internet',
    text: 'As urnas eletrônicas brasileiras operam conectadas a redes de internet sem fio Wi-Fi durante todo o período de votação dos eleitores.',
    classification: 'FAKE',
    alterationDetail: 'Afirmou-se falsamente que as urnas possuem conexão Wi-Fi ativa à internet.',
    explanation: 'As urnas eletrônicas brasileiras são equipamentos isolados de qualquer rede (técnica de ar-gap). Elas não possuem placa de rede, Wi-Fi, Bluetooth nem conexão física com a internet, impedindo qualquer acesso externo durante a votação.',
    originalOrCorrectedInfo: 'As urnas eletrônicas funcionam totalmente isoladas de internet, Wi-Fi ou Bluetooth.',
    sourceName: 'Aos Fatos',
    sourceUrl: 'https://www.aosfatos.org',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Cidadania & Tecnologia'
  },
  {
    id: 'br-05-pix-criacao',
    title: 'A criação do sistema de pagamentos instantâneos Pix',
    text: 'O sistema Pix de transferência bancária instantânea foi concebido e lançado pioneiramente pelo Banco Central dos Estados Unidos (Federal Reserve) antes de chegar ao Brasil.',
    classification: 'FAKE',
    alterationDetail: 'A criação nacional do Pix foi atribuída erroneamente ao banco central americano.',
    explanation: 'O Pix foi idealizado, desenhado e implementado pelo Banco Central do Brasil, entrando em operação plena em novembro de 2020. O sistema instantâneo do Federal Reserve americano (FedNow) só começou a operar anos depois, em julho de 2023.',
    originalOrCorrectedInfo: 'O Pix foi desenvolvido pelo Banco Central do Brasil em 2020; o sistema do Fed americano foi lançado em 2023.',
    sourceName: 'Estadão',
    sourceUrl: 'https://www.estadao.com.br',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Economia & Tecnologia'
  },
  {
    id: 'br-06-febre-amarela-macacos',
    title: 'Transmissão da febre amarela e o papel dos macacos',
    text: 'Em áreas de mata, macacos infectados mordem seres humanos para transmitir diretamente a febre amarela silvestre.',
    classification: 'FAKE',
    alterationDetail: 'A transmissão por mosquitos vetores foi substituída erroneamente por mordidas diretas de primatas.',
    explanation: 'Macacos não transmitem febre amarela diretamente para humanos. A doença é transmitida exclusivamente pela picada de mosquitos silvestres infectados (Haemagogus e Sabethes). Os macacos são vítimas do vírus e ajudam como sentinelas sanitários.',
    originalOrCorrectedInfo: 'A febre amarela é transmitida exclusivamente por mosquitos vetores, e nunca por mordida de macacos.',
    sourceName: 'BBC News Brasil',
    sourceUrl: 'https://www.bbc.com/portuguese',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Saúde & Biologia'
  },
  {
    id: 'br-07-cristo-franca',
    title: 'A escultura do Cristo Redentor na França',
    text: 'A cabeça e as mãos do monumento do Cristo Redentor no Rio de Janeiro foram modeladas e esculpidas em gesso em tamanho real pelo escultor Paul Landowski em Paris.',
    classification: 'FATO',
    explanation: 'O projeto arquitetônico e estrutural foi liderado pelo engenheiro brasileiro Heitor da Silva Costa. Os moldes escultóricos em tamanho natural da cabeça e das mãos foram executados pelo mestre franco-polonês Paul Landowski em seu ateliê em Paris.',
    originalOrCorrectedInfo: 'Fato histórico comprovado pelos acervos do IPHAN e da Arquidiocese do Rio de Janeiro.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'História & Arte'
  },
  {
    id: 'br-08-hpv-cancer',
    title: 'A eficácia da vacina contra o HPV na prevenção do câncer',
    text: 'A vacina contra o Papilomavírus Humano (HPV) previne mais de 90% dos casos de câncer de colo de útero quando aplicada na faixa etária recomendada.',
    classification: 'FATO',
    explanation: 'Estudos populacionais de longo prazo publicados na The Lancet e no Instituto Nacional de Câncer (INCA) demonstram que a vacinação em adolescentes impede infecções crônicas pelos tipos oncogênicos do vírus, eliminando mais de 90% das neoplasias cervicais.',
    originalOrCorrectedInfo: 'Fato atestado pelo Instituto Nacional de Câncer (INCA) e Organização Mundial da Saúde (OMS).',
    sourceName: 'Folha de S.Paulo',
    sourceUrl: 'https://www1.folha.uol.com.br',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'Saúde Pública'
  },
  {
    id: 'br-09-celular-carga-noite',
    title: 'Deixar o celular carregando a noite toda e o risco de explosão',
    text: 'Deixar smartphones modernos conectados ao carregador durante toda a noite faz a bateria continuar acumulando energia sem limite até romper a carcaça e explodir.',
    classification: 'FAKE',
    alterationDetail: 'Ignorou os circuitos integrados de gerenciamento de energia dos aparelhos modernos.',
    explanation: 'Aparelhos modernos e carregadores certificados possuem circuitos de proteção (PMIC) que interrompem o fornecimento de corrente assim que a bateria atinge 100%, evitando sobrecarga ou aquecimento contínuo.',
    originalOrCorrectedInfo: 'Smartphones modernos possuem sensores e circuitos que interrompem a recarga automaticamente aos 100%.',
    sourceName: 'Canaltech',
    sourceUrl: 'https://canaltech.com.br',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Tecnologia'
  },
  {
    id: 'br-10-arroz-celular-agua',
    title: 'Colocar o celular no arroz cru para secar após cair na água',
    text: 'A Apple e as principais fabricantes de eletrônicos recomendam oficialmente mergulhar o celular em um recipiente com arroz cru para retirar a umidade interna.',
    classification: 'FAKE',
    alterationDetail: 'Uma lenda urbana da internet foi apresentada como orientação técnica oficial de fabricantes.',
    explanation: 'A Apple atualizou seus manuais alertando expressamente para NÃO colocar iPhones em sacos de arroz, pois grãos e poeira de amido entram nos conectores e causam corrosão interna. O correto é bater levemente com o conector para baixo e deixar em local ventilado.',
    originalOrCorrectedInfo: 'Fabricantes desaconselham colocar celular no arroz por risco de danos por resíduos nos conectores.',
    sourceName: 'UOL Tilt',
    sourceUrl: 'https://www.uol.com.br/tilt',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Tecnologia do Cotidiano'
  },
  {
    id: 'br-11-cafe-brasil-lideranca',
    title: 'A liderança histórica do Brasil na exportação de café',
    text: 'O Brasil mantém a posição de maior produtor e maior exportador global de café verde há mais de 150 anos consecutivos.',
    classification: 'FATO',
    explanation: 'Desde a década de 1860, o Brasil se consolidou como o polo central do comércio cafeeiro internacional. Atualmente o país é responsável por cerca de um terço de todo o café produzido e exportado no globo terrestre.',
    originalOrCorrectedInfo: 'Fato atestado por séries históricas do Conselho dos Exportadores de Café do Brasil (Cecafé) e da OIC.',
    sourceName: 'G1',
    sourceUrl: 'https://g1.globo.com/economia/agronegocios',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'História & Economia'
  },
  {
    id: 'br-12-lencois-maranhenses-unesco',
    title: 'Lençóis Maranhenses como Patrimônio Mundial da UNESCO',
    text: 'Em julho de 2024, a UNESCO concedeu ao Parque Nacional dos Lençóis Maranhenses o título de Patrimônio Natural da Humanidade.',
    classification: 'FATO',
    explanation: 'O comitê da UNESCO reconheceu a singularidade do bioma costeiro onde o vento constante empurra dunas móveis pontilhadas por lagoas de água doce formadas pelas chuvas equatoriais, um cenário geológico ímpar no planeta.',
    originalOrCorrectedInfo: 'Fato registrado na 46ª sessão do Comitê do Patrimônio Mundial da UNESCO em 2024.',
    sourceName: 'Metrópoles',
    sourceUrl: 'https://www.metropoles.com',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Geografia & Meio Ambiente'
  },
  {
    id: 'br-13-bluetooth-raios',
    title: 'O sinal de Bluetooth atrai descargas elétricas e raios',
    text: 'Caminhar na rua durante uma tempestade com fones de ouvido sem fio Bluetooth ligados aumenta a probabilidade de ser atingido por raios atmosféricos.',
    classification: 'FAKE',
    alterationDetail: 'Ondas eletromagnéticas de baixa potência foram ditas como atratoras de raios.',
    explanation: 'Ondas de radiofrequência emitidas por Bluetooth ou Wi-Fi não têm condutividade elétrica nem atraem raios. Raios são descargas atmosféricas que buscam o solo por pontos elevados ou pontiagudos de alta condutividade.',
    originalOrCorrectedInfo: 'Sinais de Bluetooth não atraem raios; descargas elétricas dependem de relevo e altura, não de conexões sem fio.',
    sourceName: 'TechTudo',
    sourceUrl: 'https://www.techtudo.com.br',
    educationLevel: 'medio',
    difficulty: 'facil',
    category: 'Física & Cotidiano'
  },
  {
    id: 'br-14-amazonia-paises',
    title: 'Países que compartilham o território do bioma Amazônia',
    text: 'O território geográfico da Floresta Amazônica pertence exclusivamente ao Brasil, sem avançar pelas fronteiras de outros países da América do Sul.',
    classification: 'FAKE',
    alterationDetail: 'A extensão transfronteiriça da Amazônia foi reduzida unicamente ao Brasil.',
    explanation: 'O bioma amazônico cobre o Brasil (cerca de 60%) e mais oito nações e territórios sul-americanos: Peru, Colômbia, Venezuela, Bolívia, Equador, Guiana, Suriname e o território da Guiana Francesa.',
    originalOrCorrectedInfo: 'A Floresta Amazônica estende-se pelo Brasil e outros 8 países e territórios da América do Sul.',
    sourceName: 'Estadão',
    sourceUrl: 'https://www.estadao.com.br',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Geografia da América do Sul'
  },
  {
    id: 'br-15-nikkei-brasil',
    title: 'A maior comunidade nikkei do mundo fora do Japão',
    text: 'O Brasil abriga a maior população de pessoas de ascendência japonesa fora do território do Japão, estimada em mais de 2 milhões de nikkeis.',
    classification: 'FATO',
    explanation: 'Desde a chegada pioneira da embarcação Kasato Maru em 1908, a imigração japonesa gerou no Brasil laços culturais profundos, estabelecendo a maior coletividade de descendentes de japoneses existente fora das ilhas do Japão.',
    originalOrCorrectedInfo: 'Fato demográfico atestado pelo Consulado Geral do Japão e estudos demográficos do IBGE.',
    sourceName: 'BBC News Brasil',
    sourceUrl: 'https://www.bbc.com/portuguese',
    educationLevel: 'medio',
    difficulty: 'medio',
    category: 'História & Sociedade'
  },
  {
    id: 'br-16-emergencia-190-cobranca',
    title: 'Cobrança de taxa por ligação para o número de emergência 190',
    text: 'Uma nova resolução da Anatel determinou que todas as ligações para o serviço de emergência 190 da Polícia Militar passarão a ser tarifadas na fatura telefônica.',
    classification: 'FAKE',
    alterationDetail: 'Uma cobrança inexistente foi inventada para causar indignação sobre serviços essenciais.',
    explanation: 'A legislação brasileira e a regulamentação da Anatel asseguram que chamadas aos serviços de emergência (190 da PM, 192 do SAMU, 193 dos Bombeiros) são totalmente gratuitas em qualquer linha fixa ou móvel, com ou sem créditos.',
    originalOrCorrectedInfo: 'Chamadas para serviços públicos de emergência (190, 192, 193) são gratuitas por lei federal.',
    sourceName: 'Agência Lupa',
    sourceUrl: 'https://lupa.uol.com.br',
    educationLevel: 'fundamental',
    difficulty: 'facil',
    category: 'Cidadania & Serviços Públicos'
  },
  {
    id: 'br-17-abaporu-tarsila',
    title: 'A história da pintura modernista Abaporu',
    text: 'A artista Tarsila do Amaral pintou a emblemática tela Abaporu em janeiro de 1928 como presente de aniversário para seu marido, o escritor Oswald de Andrade.',
    classification: 'FATO',
    explanation: 'Ao receber o quadro como presente de aniversário, Oswald de Andrade e o escritor Raul Bopp ficaram impressionados com a figura enigmática e batizaram a tela de Abaporu, marco inaugural que desencadeou o Movimento Antropofágico.',
    originalOrCorrectedInfo: 'Fato histórico registrado na historiografia da arte brasileira e no catálogo do Museu MALBA.',
    sourceName: 'G1',
    sourceUrl: 'https://g1.globo.com/pop-arte',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Arte & Literatura Brasileira'
  },
  {
    id: 'br-18-pirarucu-tamanho',
    title: 'O maior peixe de água doce de escamas do mundo na Amazônia',
    text: 'O pirarucu (Arapaima gigas), peixe nativo da bacia amazônica, pode atingir até 3 metros de comprimento e pesar mais de 200 quilos.',
    classification: 'FATO',
    explanation: 'O pirarucu é considerado um verdadeiro fóssil vivo dos rios amazônicos. Por ter respiração branquial secundária e bexiga natatória adaptada para respirar ar atmosférico, precisa subir periodicamente à superfície da água.',
    originalOrCorrectedInfo: 'Fato ictiológico documentado pelo Instituto Chico Mendes (ICMBio) e Instituto Mamirauá.',
    sourceName: 'Folha de S.Paulo',
    sourceUrl: 'https://www1.folha.uol.com.br',
    educationLevel: 'fundamental',
    difficulty: 'medio',
    category: 'Fauna Brasileira'
  },
  {
    id: 'br-19-antartica-soberania',
    title: 'Soberania territorial sobre o continente da Antártica',
    text: 'De acordo com o direito marítimo internacional, o continente da Antártica é uma província soberana dividida em partes iguais entre o Brasil e o Chile.',
    classification: 'FAKE',
    alterationDetail: 'Atribuiu soberania estatal compartilhada a um continente regido por tratado desmilitarizado internacional.',
    explanation: 'O Tratado da Antártica de 1959 congelou todas as pretensões territoriais de nações soberanas. O continente gelado é destinado com exclusividade à paz, desmilitarização e pesquisa científica de cooperação internacional.',
    originalOrCorrectedInfo: 'A Antártica não pertence a país algum; sua gestão é internacional pelo Tratado da Antártica.',
    sourceName: 'Aos Fatos',
    sourceUrl: 'https://www.aosfatos.org',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Geopolítica Internacional'
  },
  {
    id: 'br-20-menor-sapo-mundo',
    title: 'Descoberta do menor sapo do mundo no Brasil',
    text: 'Pesquisadores brasileiros comprovaram que o sapinho-pulga (Brachycephalus pulex), encontrado no sul da Bahia, é o menor vertebrado conhecido do mundo, medindo menos de 8 milímetros.',
    classification: 'FATO',
    explanation: 'Pesquisa publicada na revista científica Zoologica Scripta em 2024 por herpetólogos da Universidade Estadual de Santa Cruz (UESC) comprovou que machos adultos medem em média apenas 7,1 milímetros, superando qualquer outra espécie de vertebrado.',
    originalOrCorrectedInfo: 'Fato comprovado por pesquisa zoológica da UESC publicada na revista Zoologica Scripta e noticiada pela CNN Brasil.',
    sourceName: 'CNN Brasil',
    sourceUrl: 'https://www.cnnbrasil.com.br/ciencia',
    educationLevel: 'medio',
    difficulty: 'dificil',
    category: 'Zoologia & Biodiversidade'
  }
];

// Helper function to pick questions according to game settings
export function selectGameQuestions(
  mode: 'aleatorio' | 'ensino' | 'dificuldade' | 'custom',
  education?: 'fundamental' | 'medio' | 'all',
  difficulty?: 'facil' | 'medio' | 'dificil' | 'all',
  totalCount: number = 12
): Question[] {
  let pool = [...QUESTIONS_DATABASE];

  if ((mode === 'ensino' || mode === 'custom') && education && education !== 'all') {
    pool = pool.filter(q => q.educationLevel === education);
  }
  
  if ((mode === 'dificuldade' || mode === 'custom') && difficulty && difficulty !== 'all') {
    pool = pool.filter(q => q.difficulty === difficulty);
  }

  // Shuffle pool with Fisher-Yates
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

  let selected: Question[] = [];

  if (shuffledPool.length >= totalCount) {
    selected = shuffledPool.slice(0, totalCount);
  } else {
    // If strict filter pool has fewer than requested totalCount,
    // take all from pool and supplement from remaining questions in database without duplicate
    selected = [...shuffledPool];
    const remainingNeeded = totalCount - selected.length;
    const fallbackPool = QUESTIONS_DATABASE
      .filter(q => !selected.some(s => s.id === q.id))
      .sort(() => Math.random() - 0.5);
    selected = [...selected, ...fallbackPool.slice(0, remainingNeeded)];
  }

  return selected;
}

