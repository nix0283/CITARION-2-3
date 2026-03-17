# What economic data is available in Pine?

**URL:** https://www.tradingview.com/support/solutions/43000665359-what-economic-data-is-available-in-pine/

---

- [ Help Center ](/)
- / 
- / [ General information about economic data ](/support/folders/43000581130-general-information-about-economic-data/)
- / [ What economic data is available in Pine? ](/support/solutions/43000665359-what-economic-data-is-available-in-pine/)

# What economic data is available in Pine? 
 This list contains all the economic data available in Pine Script™.

You can learn more here [about economic data in general](https://www.tradingview.com/support/folders/43000581130-general-information-about-economic-indicators/) and [about each metric specifically](https://www.tradingview.com/support/folders/43000581956-list-of-available-economic-indicators/). Note that economic data is different from the financial data that is also available. Economic data is information on a country or region's economic activity, whereas financials are metrics related to the fundamentals of a particular symbol.

The first table here lists the `*country_code*` of all countries or regions that TradingView provides economic data for. The second table lists the `field` code corresponding to each metric. Note that all metrics are not available for all countries. The Help Center article on each metric documents the countries for which it is available. 

Scripts can request economic data through the `*[request.economic()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}economic)*` function: 

 request.economic(country_code, field, gaps, ignore_invalid_symbol) The country and field codes in the lists below are used as arguments for the `*country_code*` and `*field*` parameters in `* [request.economic()](https://www.tradingview.com/pine-script-reference/v5/#fun_request{dot}economic)* ` function calls. For example:

 e = request.economic("US", "GDP") 
#### Table 1. Country/region codes 
 Country/Region code

Country/Region name

AF

Afghanistan

AL

Albania

DZ

Algeria

AD

Andorra

AO

Angola

AG

Antigua and Barbuda

AR

Argentina

AM

Armenia

AW

Aruba

AU

Australia

AT

Austria

AZ

Azerbaijan

BS

Bahamas

BH

Bahrain

BD

Bangladesh

BB

Barbados

BY

Belarus

BE

Belgium

BZ

Belize

BJ

Benin

BM

Bermuda

BT

Bhutan

BO

Bolivia

BA

Bosnia and Herzegovina

BW

Botswana

BR

Brazil

BN

Brunei

BG

Bulgaria

BF

Burkina Faso

BI

Burundi

KH

Cambodia

CM

Cameroon

CA

Canada

CV

Cape Verde

KY

Cayman Islands

CF

Central African Republic

TD

Chad

CL

Chile

CN

China

CO

Colombia

KM

Comoros

CG

Congo

CR

Costa Rica

HR

Croatia

CU

Cuba

CY

Cyprus

CZ

Czech Republic

DK

Denmark

DJ

Djibouti

DM

Dominica

DO

Dominican Republic

TL

East Timor

EC

Ecuador

EG

Egypt

SV

El Salvador

GQ

Equatorial Guinea

ER

Eritrea

EE

Estonia

ET

Ethiopia

EU

Euro area

FO

Faroe Islands

FJ

Fiji

FI

Finland

FR

France

GA

Gabon

GM

Gambia

GE

Georgia

DE

Germany

GH

Ghana

GR

Greece

GL

Greenland

GD

Grenada

GT

Guatemala

GN

Guinea

GW

Guinea Bissau

GY

Guyana

HT

Haiti

HN

Honduras

HK

Hong Kong

HU

Hungary

IS

Iceland

IN

India

ID

Indonesia

IR

Iran

IQ

Iraq

IE

Ireland

IM

Isle of Man

IL

Israel

IT

Italy

CI

Ivory Coast

JM

Jamaica

JP

Japan

JO

Jordan

KZ

Kazakhstan

KE

Kenya

KI

Kiribati

XK

Kosovo

KW

Kuwait

KG

Kyrgyzstan

LA

Laos

LV

Latvia

LB

Lebanon

LS

Lesotho

LR

Liberia

LY

Libya

LI

Liechtenstein

LT

Lithuania

LU

Luxembourg

MO

Macau

MK

Macedonia

MG

Madagascar

MW

Malawi

MY

Malaysia

MV

Maldives

ML

Mali

MT

Malta

MR

Mauritania

MU

Mauritius

MX

Mexico

MD

Moldova

MC

Monaco

MN

Mongolia

ME

Montenegro

MA

Morocco

MZ

Mozambique

MM

Myanmar

NA

Namibia

NP

Nepal

NL

Netherlands

NC

New Caledonia

NZ

New Zealand

NI

Nicaragua

NE

Niger

NG

Nigeria

KP

North Korea

NO

Norway

OM

Oman

PK

Pakistan

PS

Palestine

PA

Panama

PG

Papua New Guinea

PY

Paraguay

PE

Peru

PH

Philippines

PL

Poland

PT

Portugal

PR

Puerto Rico

QA

Qatar

CD

Republic of the Congo

RO

Romania

RU

Russia

RW

Rwanda

WS

Samoa

SM

San Marino

ST

Sao Tome and Principe

SA

Saudi Arabia

SN

Senegal

RS

Serbia

SC

Seychelles

SL

Sierra Leone

SG

Singapore

SK

Slovakia

SI

Slovenia

SB

Solomon Islands

SO

Somalia

ZA

South Africa

KR

South Korea

SS

South Sudan

ES

Spain

LK

Sri Lanka

LC

St Lucia

VC

St Vincent and the Grenadines

SD

Sudan

SR

Suriname

SZ

Swaziland

SE

Sweden

CH

Switzerland

SY

Syria

TW

Taiwan

TJ

Tajikistan

TZ

Tanzania

TH

Thailand

TG

Togo

TO

Tonga

TT

Trinidad and Tobago

TN

Tunisia

TR

Turkey

TM

Turkmenistan

UG

Uganda

UA

Ukraine

AE

United Arab Emirates

GB

United Kingdom

US

United States

UY

Uruguay

UZ

Uzbekistan

VU

Vanuatu

VE

Venezuela

VN

Vietnam

YE

Yemen

ZM

Zambia

ZW

Zimbabwe

#### Table 2. Field codes 

Field Code

Metric

AA

Asylum Applications

ACR

API Crude Runs

AE

Auto Exports

AHE

Average Hourly Earnings

AHO

API Heating Oil

AWH

Average Weekly Hours

BBS

Banks Balance Sheet

BCLI

Business Climate Indicator

BCOI

Business Confidence Index

BI

Business Inventories

BLR

Bank Lending Rate

BOI

NFIB Business Optimism Index

BOT

Balance Of Trade

BP

Building Permits

BR

Bankruptcies

CA

Current Account

CAG

Current Account To GDP

CAP

Car Production

CAR

Car Registrations

CBBS

Central Bank Balance Sheet

CCC

Claimant Count Change

CCI

Consumer Confidence Index

CCOS

Cushing Crude Oil Stocks

CCP

Core Consumer Prices

CCPI

Core CPI

CCPT

Consumer Confidence Price Trends

CCR

Consumer Credit

CCS

Credit Card Spending

CEP

Cement Production

CF

Capital Flows

CFNAI

Chicago Fed National Activity Index

CI

API Crude Imports

CIND

Coincident Index

CIR

Core Inflation Rate, YoY

CJC

Continuing Jobless Claims

CN

API Cushing Number

COI

Crude Oil Imports

COIR

Crude Oil Imports from Russia

CONSTS

Construction Spending

COP

Crude Oil Production

COR

Crude Oil Rigs

CORD

Construction Orders, YoY

CORPI

Corruption Index

CORR

Corruption Rank

COSC

Crude Oil Stocks Change

COUT

Construction Output, YoY

CP

Copper Production

CPCEPI

Core PCE Price Index

CPI

Consumer Price Index

CPIHU

CPI Housing Utilities

CPIM

CPI Median

CPIT

CPI Transportation

CPITM

CPI Trimmed Mean

CPMI

Chicago PMI

CPPI

Core Producer Price Index

CPR

Corporate Profits

CRLPI

Cereals Price Index

CRR

Cash Reserve Ratio

CS

Consumer Spending

CSC

API Crude Oil Stock Change

CSHPI

Case Shiller Home Price Index

CSHPIMM

Case Shiller Home Price Index, MoM

CSHPIYY

Case Shiller Home Price Index, YoY

CSS

Chain Store Sales

CTR

Corporate Tax Rate

CU

Capacity Utilization

DFMI

Dallas Fed Manufacturing Index

DFP

Distillate Fuel Production

DFS

Distillate Stocks

DFSI

Dallas Fed Services Index

DFSRI

Dallas Fed Services Revenues Index

DG

Deposit Growth

DGO

Durable Goods Orders

DGOED

Durable Goods Orders Excluding Defense

DGOET

Durable Goods Orders Excluding Transportation

DIR

Deposit Interest Rate

DPI

Disposable Personal Income

DRPI

Dairy Price Index

DS

API Distillate Stocks

DT

CBI Distributive Trades

EC

ADP Employment Change

ED

External Debt

EDBR

Ease Of Doing Business Ranking

EHS

Existing Home Sales

ELP

Electricity Production

EMC

Employment Change

EMCI

Employment Cost Index

EMP

Employed Persons

EMR

Employment Rate

EOI

Economic Optimism Index

EP

Export Prices

ESI

ZEW Economic Sentiment Index

EWS

Economy Watchers Survey

EXP

Exports

EXPYY

Exports, YoY

FAI

Fixed Asset Investment

FBI

Foreign Bond Investment

FDI

Foreign Direct Investment

FE

Fiscal Expenditure

FER

Foreign Exchange Reserves

FI

Food Inflation, YoY

FO

Factory Orders

FOET

Factory Orders Excluding Transportation

FPI

Food Price Index

FSI

Foreign Stock Investment

FTE

Full Time Employment

FYGDPG

Full Year GDP Growth

GASP

Gasoline Prices

GBP

Government Budget

GBV

Government Budget Value

GCI

Competitiveness Index

GCR

Competitiveness Rank

GD

Government Debt

GDG

Government Debt To GDP

GDP

GDP

GDPA

GDP From Agriculture

GDPC

GDP From Construction

GDPCP

GDP Constant Prices

GDPD

GDP Deflator

GDPGA

GDP Growth Annualized

GDPMAN

GDP From Manufacturing

GDPMIN

GDP From Mining

GDPPA

GDP From Public Administration

GDPPC

GDP Per Capita

GDPPCP

GDP Per Capita, PPP

GDPQQ

GDP Growth Rate

GDPS

GDP From Services

GDPSA

GDP Sales

GDPT

GDP From Transport

GDPU

GDP From Utilities

GDPYY

GDP, YoY

GDTPI

Global Dairy Trade Price Index

GFCF

Gross Fixed Capital Formation

GNP

Gross National Product

GP

Gold Production

GPA

Government Payrolls

GPRO

Gasoline Production

GR

Government Revenues

GRES

Gold Reserves

GS

API Gasoline Stocks

GSC

Grain Stocks Corn

GSCH

Gasoline Stocks Change

GSG

Government Spending To GDP

GSP

Government Spending

GSS

Grain Stocks Soy

GSW

Grain Stocks Wheat

GTB

Goods Trade Balance

HB

Hospital Beds

HDG

Households Debt To GDP

HDI

Households Debt To Income

HICP

Harmonised Index of Consumer Prices

HIRMM

Harmonised Inflation Rate, MoM

HIRYY

Harmonised Inflation Rate, YoY

HMI

NAHB Housing Market Index

HOR

Home Ownership Rate

HOS

Heating Oil Stocks

HOSP

Hospitals

HPI

House Price Index

HPIMM

House Price Index, MoM

HPIYY

House Price Index, YoY

HS

Home Loans

HSP

Household Spending

HST

Housing Starts

IC

Changes In Inventories

ICUB

ICU Beds

IE

Inflation Expectations

IFOCC

Ifo Assessment Of The Business Situation

IFOE

Ifo Business Developments Expectations

IJC

Initial Jobless Claims

IMP

Imports

IMPYY

Imports, YoY

INBR

Interbank Rate

INTR

Interest Rate

IPA

Ip Addresses

IPMM

Industrial Production, MoM

IPRI

Import Prices

IPYY

Industrial Production, YoY

IRMM

Inflation Rate, MoM

IRYY

Inflation Rate, YoY

IS

Industrial Sentiment

ISP

Internet Speed

JA

Job Advertisements

JAR

Jobs To Applications Ratio

JC

Challenger Job Cuts

JC4W

Jobless Claims, 4-Week Average

JO

Job Offers

JV

Job Vacancies

KFMI

Kansas Fed Manufacturing Index

LB

Loans To Banks

LC

Labour Costs

LEI

Leading Economic Index

LFPR

Labor Force Participation Rate

LG

Loan Growth, YoY

LIVRR

Liquidity Injections Via Reverse Repo

LMIC

LMI Logistics Managers Index Current

LMICI

LMI Inventory Costs

LMIF

LMI Logistics Managers Index Future

LMITP

LMI Transportation Prices

LMIWP

LMI Warehouse Prices

LPS

Loans To Private Sector

LR

Central Bank Lending Rate

LTUR

Long Term Unemployment Rate

LWF

Living Wage Family

LWI

Living Wage Individual

M0

Money Supply M0

M1

Money Supply M1

M2

Money Supply M2

M3

Money Supply M3

MA

Mortgage Approvals

MAPL

Mortgage Applications

MCE

Michigan Consumer Expectations

MCEC

Michigan Current Economic Conditions

MD

Medical Doctors

ME

Military Expenditure

MGDPYY

Monthly GDP, YoY

MIE1Y

Michigan Inflation Expectations

MIE5Y

Michigan 5 Year Inflation Expectations

MIP

Mining Production, YoY

MMI

MBA Mortgage Market Index

MO

Machinery Orders

MP

Manufacturing Payrolls

MPI

Meat Price Index

MPRMM

Manufacturing Production, MoM

MPRYY

Manufacturing Production, YoY

MR

Mortgage Rate

MRI

MBA Mortgage Refinance Index

MS

Manufacturing Sales

MTO

Machine Tool Orders

MW

Minimum Wages

NDCGOEA

Orders For Non-defense Capital Goods Excluding Aircraft

NEGTB

Goods Trade Deficit With Non-eu Countries

NFP

Nonfarm Payrolls

NGI

Natural Gas Imports

NGIR

Natural Gas Imports from Russia

NGSC

Natural Gas Stocks Change

NHPI

Nationwide House Price Index

NHS

New Home Sales

NHSMM

New Home Sales, Mom

NMPMI

Non-Manufacturing PMI

NO

New Orders

NODXMM

Non-Oil Domestic Exports

NODXYY

Non-oil Domestic Exports, YoY

NOE

Non Oil Exports

NPP

Nonfarm Payrolls Private

NURS

Nurses

NYESMI

NY Empire State Manufacturing Index

OE

Oil Exports

OPI

Oils Price Index

PCEPI

PCE Price Index

PDG

Private Debt To GDP

PFMI

Philadelphia Fed Manufacturing Index

PHSIMM

Pending Home Sales Index, MoM

PHSIYY

Pending Home Sales Index, YoY

PI

Personal Income

PIN

Private Investment

PIND

MBA Purchase Index

PITR

Personal Income Tax Rate

POP

Population

PPI

Producer Price Index

PPII

Producer Price Index Input

PPIMM

Producer Price Inflation, MoM

PPIYY

Producer Prices Index, YoY

PRI

API Product Imports

PROD

Productivity

PS

Personal Savings

PSC

Private Sector Credit

PSP

Personal Spending

PTE

Part Time Employment

PUAC

Pandemic Unemployment Assistance Claims

RAM

Retirement Age Men

RAW

Retirement Age Women

RCR

Refinery Crude Runs

REM

Remittances

RFMI

Richmond Fed Manufacturing Index

RFMSI

Richmond Fed Manufacturing Shipments Index

RFSI

Richmond Fed Services Index

RI

Redbook Index

RIEA

Retail Inventories Excluding Autos

RPI

Retail Price Index

RR

Repo Rate

RRR

Reverse Repo Rate

RSEA

Retail Sales Excluding Autos

RSEF

Retail Sales Excluding Fuel

RSMM

Retail Sales, MoM

RSYY

Retail Sales, YoY

RTI

Reuters Tankan Index

SBSI

Small Business Sentiment Index

SFHP

Single Family Home Prices

SP

Steel Production

SPI

Sugar Price Index

SS

Services Sentiment

SSR

Social Security Rate

SSRC

Social Security Rate For Companies

SSRE

Social Security Rate For Employees

STR

Sales Tax Rate

TA

Tourist Arrivals

TAXR

Tax Revenue

TCB

Treasury Cash Balance

TCPI

Tokyo CPI

TI

Terrorism Index

TII

Tertiary Industry Index

TOT

Terms Of Trade

TR

Tourism Revenues

TVS

Total Vehicle Sales

UC

Unemployment Change

UP

Unemployed Persons

UR

Unemployment Rate

WAG

Wages

WES

Weapons Sales

WG

Wage Growth, YoY

WHS

Wages High Skilled

WI

Wholesale Inventories

WLS

Wages Low Skilled

WM

Wages In Manufacturing

WPI

Wholesale Price Index

WS

Wholesale Sales

YUR

Youth Unemployment Rate

ZCC

ZEW Current Conditions
 Previous Previous How to display economic data values ​​on a chart? Next Next Category Launch Supercharts

