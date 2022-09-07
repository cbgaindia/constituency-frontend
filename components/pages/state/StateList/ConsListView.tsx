import { MapViz } from 'components/viz';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { swrFetch } from 'utils/helper';

const tempMapData = [
  {
    name: '1',
    value: '0.22',
    mapName: 'VALMIKI NAGAR',
  },
  {
    name: '2',
    value: '0.01',
    mapName: 'RAMNAGAR (SC)',
  },
  {
    name: '3',
    value: '0.24',
    mapName: 'NARKATIAGANJ',
  },
  {
    name: '4',
    value: '0.12',
    mapName: 'BAGAHA',
  },
  {
    name: '5',
    value: '0.02',
    mapName: 'LAURIYA',
  },
  {
    name: '6',
    value: '0.00',
    mapName: 'NAUTAN',
  },
  {
    name: '7',
    value: '0.00',
    mapName: 'CHANPATIA',
  },
  {
    name: '9',
    value: '0.06',
    mapName: 'SIKTA',
  },
  {
    name: '10',
    value: '0.32',
    mapName: 'RAXAUL',
  },
  {
    name: '11',
    value: '0.34',
    mapName: 'SUGAULI',
  },
  {
    name: '12',
    value: '0.98',
    mapName: 'NARKATIA',
  },
  {
    name: '13',
    value: '0.10',
    mapName: 'HARSIDHI (SC)',
  },
  {
    name: '14',
    value: '0.03',
    mapName: 'GOVINDGANJ',
  },
  {
    name: '15',
    value: '0.81',
    mapName: 'KESARIA',
  },
  {
    name: '16',
    value: '0.26',
    mapName: 'KALYANPUR',
  },
  {
    name: '18',
    value: '0.14',
    mapName: 'MADHUBAN',
  },
  {
    name: '19',
    value: '0.11',
    mapName: 'MOTIHARI',
  },
  {
    name: '20',
    value: '0.35',
    mapName: 'CHIRAIA',
  },
  {
    name: '21',
    value: '0.29',
    mapName: 'DHAKA',
  },
  {
    name: '22',
    value: '0.09',
    mapName: 'SHEOHAR',
  },
  {
    name: '30',
    value: '0.01',
    mapName: 'BELSAND',
  },
  {
    name: '31',
    value: '0.82',
    mapName: 'HARLAKHI',
  },
  {
    name: '32',
    value: '2.80',
    mapName: 'BENIPATTI',
  },
  {
    name: '33',
    value: '0.47',
    mapName: 'KHAJAULI',
  },
  {
    name: '34',
    value: '0.97',
    mapName: 'BABU BARHI',
  },
  {
    name: '35',
    value: '0.32',
    mapName: 'BISFI',
  },
  {
    name: '36',
    value: '0.74',
    mapName: 'MADHUBANI',
  },
  {
    name: '37',
    value: '1.05',
    mapName: 'RAJNAGAR (SC)',
  },
  {
    name: '38',
    value: '0.14',
    mapName: 'JHANJHARPUR',
  },
  {
    name: '39',
    value: '0.34',
    mapName: 'PHULPARAS',
  },
  {
    name: '40',
    value: '1.00',
    mapName: 'LAUKAHA',
  },
  {
    name: '41',
    value: '0.75',
    mapName: 'NIRMALI',
  },
  {
    name: '42',
    value: '1.45',
    mapName: 'PIPRA',
  },
  {
    name: '43',
    value: '1.82',
    mapName: 'SUPAUL',
  },
  {
    name: '44',
    value: '0.40',
    mapName: 'TRIBENIGANJ (SC)',
  },
  {
    name: '45',
    value: '1.47',
    mapName: 'CHHATAPUR',
  },
  {
    name: '53',
    value: '0.00',
    mapName: 'THAKURGANJ',
  },
  {
    name: '56',
    value: '0.45',
    mapName: 'AMOUR',
  },
  {
    name: '57',
    value: '3.40',
    mapName: 'BAISI',
  },
  {
    name: '58',
    value: '1.82',
    mapName: 'KASBA',
  },
  {
    name: '59',
    value: '0.91',
    mapName: 'BANMANKHI (SC)',
  },
  {
    name: '60',
    value: '2.11',
    mapName: 'RUPAULI',
  },
  {
    name: '61',
    value: '3.31',
    mapName: 'DHAMDAHA',
  },
  {
    name: '62',
    value: '0.83',
    mapName: 'PURNIA',
  },
  {
    name: '63',
    value: '0.40',
    mapName: 'KATIHAR',
  },
  {
    name: '64',
    value: '0.33',
    mapName: 'KADWA',
  },
  {
    name: '65',
    value: '0.27',
    mapName: 'BALRAMPUR',
  },
  {
    name: '66',
    value: '0.16',
    mapName: 'PRANPUR',
  },
  {
    name: '67',
    value: '0.26',
    mapName: 'MANIHARI (ST)',
  },
  {
    name: '68',
    value: '0.24',
    mapName: 'BARARI',
  },
  {
    name: '69',
    value: '0.15',
    mapName: 'KORHA (SC)',
  },
  {
    name: '70',
    value: '0.32',
    mapName: 'ALAMNAGAR',
  },
  {
    name: '71',
    value: '0.29',
    mapName: 'BIHARIGANJ',
  },
  {
    name: '72',
    value: '0.15',
    mapName: 'SINGHESHWAR (SC)',
  },
  {
    name: '73',
    value: '0.49',
    mapName: 'MADHEPURA',
  },
  {
    name: '74',
    value: '0.91',
    mapName: 'SONBARSA (SC)',
  },
  {
    name: '75',
    value: '0.85',
    mapName: 'SAHARSA',
  },
  {
    name: '76',
    value: '1.77',
    mapName: 'SIMRI BAKHTIARPUR',
  },
  {
    name: '77',
    value: '0.82',
    mapName: 'MAHISHI',
  },
  {
    name: '78',
    value: '0.00',
    mapName: 'KUSHESHWAR ASTHAN (SC)',
  },
  {
    name: '79',
    value: '0.00',
    mapName: 'GORA BAURAM',
  },
  {
    name: '82',
    value: '0.04',
    mapName: 'DARBHANGA GRAMIN',
  },
  {
    name: '83',
    value: '0.00',
    mapName: 'DARBHANGA',
  },
  {
    name: '84',
    value: '0.05',
    mapName: 'HAYAGHAT',
  },
  {
    name: '85',
    value: '0.04',
    mapName: 'BAHADURPUR',
  },
  {
    name: '86',
    value: '0.01',
    mapName: 'KEOTI',
  },
  {
    name: '87',
    value: '0.00',
    mapName: 'JALE',
  },
  {
    name: '88',
    value: '0.16',
    mapName: 'GAIGHAT',
  },
  {
    name: '89',
    value: '0.10',
    mapName: 'AURAI',
  },
  {
    name: '90',
    value: '0.02',
    mapName: 'MINAPUR',
  },
  {
    name: '91',
    value: '0.09',
    mapName: 'BOCHAHA (SC)',
  },
  {
    name: '92',
    value: '0.04',
    mapName: 'SAKRA (SC)',
  },
  {
    name: '93',
    value: '0.01',
    mapName: 'KURHANI',
  },
  {
    name: '94',
    value: '0.00',
    mapName: 'MUZAFFARPUR',
  },
  {
    name: '95',
    value: '0.29',
    mapName: 'KANTI',
  },
  {
    name: '96',
    value: '0.54',
    mapName: 'BARURAJ(MOTIPUR)',
  },
  {
    name: '97',
    value: '0.16',
    mapName: 'PAROO',
  },
  {
    name: '98',
    value: '0.02',
    mapName: 'SAHEBGANJ',
  },
  {
    name: '99',
    value: '1.37',
    mapName: 'BAIKUNTHPUR',
  },
  {
    name: '100',
    value: '0.43',
    mapName: 'BARAULI',
  },
  {
    name: '101',
    value: '1.30',
    mapName: 'GOPALGANJ',
  },
  {
    name: '102',
    value: '1.30',
    mapName: 'KUCHAIKOTE',
  },
  {
    name: '103',
    value: '0.73',
    mapName: 'BHOREY (SC)',
  },
  {
    name: '104',
    value: '1.03',
    mapName: 'HATHUA',
  },
  {
    name: '113',
    value: '0.23',
    mapName: 'EKMA',
  },
  {
    name: '114',
    value: '0.35',
    mapName: 'MANJHI',
  },
  {
    name: '115',
    value: '0.40',
    mapName: 'BANIAPUR',
  },
  {
    name: '116',
    value: '1.62',
    mapName: 'TARAIYA',
  },
  {
    name: '117',
    value: '0.79',
    mapName: 'MARHAURA',
  },
  {
    name: '118',
    value: '0.03',
    mapName: 'CHAPRA',
  },
  {
    name: '119',
    value: '0.46',
    mapName: 'GARKHA (SC)',
  },
  {
    name: '120',
    value: '0.35',
    mapName: 'AMNOUR',
  },
  {
    name: '121',
    value: '0.48',
    mapName: 'PARSA',
  },
  {
    name: '122',
    value: '0.15',
    mapName: 'SONEPUR',
  },
  {
    name: '125',
    value: '0.05',
    mapName: 'VAISHALI',
  },
  {
    name: '128',
    value: '0.08',
    mapName: 'RAGHOPUR',
  },
  {
    name: '129',
    value: '0.00',
    mapName: 'MAHNAR',
  },
  {
    name: '131',
    value: '0.06',
    mapName: 'KALYANPUR (SC)',
  },
  {
    name: '132',
    value: '0.72',
    mapName: 'WARISNAGAR',
  },
  {
    name: '133',
    value: '0.30',
    mapName: 'SAMASTIPUR',
  },
  {
    name: '134',
    value: '0.35',
    mapName: 'UJIARPUR',
  },
  {
    name: '135',
    value: '0.23',
    mapName: 'MORWA',
  },
  {
    name: '136',
    value: '0.66',
    mapName: 'SARAIRANJAN',
  },
  {
    name: '137',
    value: '0.55',
    mapName: 'MOHIUDDINAGAR',
  },
  {
    name: '138',
    value: '0.05',
    mapName: 'BIBHUTIPUR',
  },
  {
    name: '139',
    value: '0.05',
    mapName: 'ROSERA (SC)',
  },
  {
    name: '140',
    value: '0.30',
    mapName: 'HASANPUR',
  },
  {
    name: '141',
    value: '0.24',
    mapName: 'CHERIA BARIARPUR',
  },
  {
    name: '142',
    value: '0.47',
    mapName: 'BACHHWARA',
  },
  {
    name: '143',
    value: '0.23',
    mapName: 'TEGHRA',
  },
  {
    name: '144',
    value: '0.43',
    mapName: 'MATIHANI',
  },
  {
    name: '145',
    value: '0.24',
    mapName: 'SAHEBPUR KAMAL',
  },
  {
    name: '146',
    value: '0.34',
    mapName: 'BEGUSARAI',
  },
  {
    name: '147',
    value: '0.54',
    mapName: 'BAKHRI (SC)',
  },
  {
    name: '151',
    value: '0.09',
    mapName: 'PARBATTA',
  },
  {
    name: '152',
    value: '0.33',
    mapName: 'BIHPUR',
  },
  {
    name: '153',
    value: '0.57',
    mapName: 'GOPALPUR',
  },
  {
    name: '154',
    value: '0.33',
    mapName: 'PIRPAINTI (SC)',
  },
  {
    name: '157',
    value: '0.08',
    mapName: 'SULTANGANJ',
  },
  {
    name: '158',
    value: '0.16',
    mapName: 'NATHNAGAR',
  },
  {
    name: '159',
    value: '0.56',
    mapName: 'AMARPUR',
  },
  {
    name: '160',
    value: '0.65',
    mapName: 'DHURAIYA (SC)',
  },
  {
    name: '161',
    value: '0.61',
    mapName: 'BANKA',
  },
  {
    name: '162',
    value: '0.32',
    mapName: 'KATORIA (ST)',
  },
  {
    name: '163',
    value: '0.95',
    mapName: 'BELHAR',
  },
  {
    name: '167',
    value: '1.34',
    mapName: 'SURAJGARHA',
  },
  {
    name: '168',
    value: '0.21',
    mapName: 'LAKHISARAI',
  },
  {
    name: '169',
    value: '0.98',
    mapName: 'SEIKHPURA',
  },
  {
    name: '170',
    value: '0.88',
    mapName: 'BARBIGHA',
  },
  {
    name: '178',
    value: '0.84',
    mapName: 'MOKAMEH',
  },
  {
    name: '179',
    value: '1.22',
    mapName: 'BARH',
  },
  {
    name: '180',
    value: '1.50',
    mapName: 'BAKHTIARPUR',
  },
  {
    name: '181',
    value: '0.03',
    mapName: 'DIGHA',
  },
  {
    name: '185',
    value: '0.52',
    mapName: 'FATWAH',
  },
  {
    name: '186',
    value: '0.50',
    mapName: 'DANAPUR',
  },
  {
    name: '187',
    value: '2.33',
    mapName: 'MANER',
  },
  {
    name: '188',
    value: '1.20',
    mapName: 'PHULWARI (SC)',
  },
  {
    name: '189',
    value: '2.54',
    mapName: 'MASAURHI (SC)',
  },
  {
    name: '190',
    value: '2.84',
    mapName: 'PALIGANJ',
  },
  {
    name: '191',
    value: '2.90',
    mapName: 'BIKRAM',
  },
  {
    name: '192',
    value: '1.24',
    mapName: 'SANDESH',
  },
  {
    name: '193',
    value: '2.12',
    mapName: 'BARHARA',
  },
  {
    name: '194',
    value: '0.27',
    mapName: 'ARRAH',
  },
  {
    name: '195',
    value: '1.12',
    mapName: 'AGIAON (SC)',
  },
  {
    name: '196',
    value: '0.45',
    mapName: 'TARARI',
  },
  {
    name: '197',
    value: '1.88',
    mapName: 'JAGDISHPUR',
  },
  {
    name: '198',
    value: '1.61',
    mapName: 'SHAHPUR',
  },
  {
    name: '199',
    value: '0.19',
    mapName: 'BARHAMPUR',
  },
  {
    name: '200',
    value: '0.00',
    mapName: 'BUXAR',
  },
  {
    name: '202',
    value: '0.11',
    mapName: 'RAJPUR (SC)',
  },
  {
    name: '203',
    value: '0.06',
    mapName: 'RAMGARH',
  },
  {
    name: '204',
    value: '0.07',
    mapName: 'MOHANIA (SC)',
  },
  {
    name: '205',
    value: '0.18',
    mapName: 'BHABUA',
  },
  {
    name: '206',
    value: '0.25',
    mapName: 'CHAINPUR',
  },
  {
    name: '207',
    value: '0.24',
    mapName: 'CHENARI (SC)',
  },
  {
    name: '210',
    value: '0.13',
    mapName: 'DINARA',
  },
  {
    name: '214',
    value: '0.48',
    mapName: 'ARWAL',
  },
  {
    name: '215',
    value: '0.83',
    mapName: 'KURTHA',
  },
  {
    name: '216',
    value: '2.26',
    mapName: 'JEHANABAD',
  },
  {
    name: '217',
    value: '1.73',
    mapName: 'GHOSHI',
  },
  {
    name: '218',
    value: '1.97',
    mapName: 'MAKHDUMPUR (SC)',
  },
  {
    name: '219',
    value: '0.68',
    mapName: 'GOH',
  },
  {
    name: '220',
    value: '0.22',
    mapName: 'OBRA',
  },
  {
    name: '221',
    value: '0.09',
    mapName: 'NABINAGAR',
  },
  {
    name: '222',
    value: '0.40',
    mapName: 'KUTUMBA (SC)',
  },
  {
    name: '223',
    value: '0.32',
    mapName: 'AURANGABAD',
  },
  {
    name: '224',
    value: '0.81',
    mapName: 'RFIGANJ',
  },
  {
    name: '225',
    value: '0.30',
    mapName: 'GURUA',
  },
  {
    name: '226',
    value: '0.26',
    mapName: 'SHERGHATI',
  },
  {
    name: '227',
    value: '0.59',
    mapName: 'IMAMGANJ (SC)',
  },
  {
    name: '228',
    value: '1.08',
    mapName: 'BARACHATTI (SC)',
  },
  {
    name: '229',
    value: '1.20',
    mapName: 'BODH GAYA (SC)',
  },
  {
    name: '231',
    value: '0.96',
    mapName: 'TIKARI',
  },
  {
    name: '232',
    value: '0.79',
    mapName: 'BELAGANJ',
  },
  {
    name: '233',
    value: '0.54',
    mapName: 'ATRI',
  },
  {
    name: '234',
    value: '0.78',
    mapName: 'WAZIRGANJ',
  },
  {
    name: '238',
    value: '0.01',
    mapName: 'GOVINDPUR',
  },
  {
    name: '239',
    value: '0.00',
    mapName: 'WARISALIGANJ',
  },
  {
    name: '240',
    value: '1.36',
    mapName: 'SIKANDARA (SC)',
  },
  {
    name: '241',
    value: '0.59',
    mapName: 'JAMUI',
  },
  {
    name: '242',
    value: '1.80',
    mapName: 'JHAJHA',
  },
  {
    name: '243',
    value: '0.79',
    mapName: 'CHAKAI',
  },
];

const ConsListView = ({ meta }) => {
  const router = useRouter();
  const { data, isLoading } = swrFetch(
    `/assets/maps/${meta.sabha}/${meta.state}.json`
  );
  console.log(meta);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <Wrapper>
      <MapViz
        mapFile={data}
        meta={meta}
        data={tempMapData}
        vizIndicators={[]}
        onlyLabel
        newMapItem={(e) => {
          e ? router.push(`${meta.state}/${meta.sabha}/${e.mapName}`) : null;
        }}
      />
    </Wrapper>
  );
};

export default ConsListView;

const Wrapper = styled.div`
  flex-basis: 70%;
  /* flex-shrink: 1; */
  flex-grow: 1;
  background-color: var(--color-background-lighter);
  padding: 24px;
  border-radius: 4px;
  border: var(--border-2);
  filter: drop-shadow(var(--box-shadow-1));

  @media (max-width: 810px) {
    display: none;
  }
`;
