'use strict';
/**
 * Created by tpineau
 */
var b64 = "PGh0bWw+DQo8Ym9keT48aW1nIHNyYz0iY2lkOjFAd2lucyI+PGJyPg0KDQqCsYLqgr6Cr5eYiXaK\
bZbxgr6CwYLEjL6CwYLEguCCx4KkgrmQTYK2gsSCrYLqgsiCooLxgsWCtYLlgqSBSDxicj4NCoLF\
guCShoLJgs2QTYK2gsSCrYLqgumQbILggqKC6YLGjnaCwYLEkvqC34K4gsmMvoKigtyCt4LLgUI8\
YnI+DQqCsYKxgUGC2YLxgsGCxoLJgtmC8YLGgsmXmIl2im2W8YLIgvGCxYK3guaBSYFJPGJyPg0K\
g1SDQ4NnjKmCvYLngu2CqYLogtyCt4FJjKmCxIKtgr6Cs4KiguaBSTxicj48YnI+DQoNCj4+PGEg\
aHJlZj0iaHR0cDovLzAwMy54emFqaWVybW5oLmNsaWNrL2wwYi93ZTh4My5waHA/MTI9dDB5NXpR\
a3dKUWtFNzBrRUwwbk04bUxHNzBQMXowa3c4MWJiIj6T/Iz7PC9hPjxicj48YnI+DQoNCoNUg0OD\
Z4KqiVKCyILxgqmPkYKtgsaOdoKigtyCt4KpgUiCu4LxgsiCsYLGgrWCvYLnkaaS14LqgumCqYFB\
jHiOQILMgqiQophigsmCyILBgr+C4YKigtyCt4LmgUI8YnI+DQqCvoKpgueQ4pHOiVKCyILxgqmP\
kYKvgsiCooLxgsWCt4FJPGJyPg0KDQqCxYLggUGCooKtgueJ0oKwgumCqYLHgqSCqYLNgqCCyIK9\
jp+R5oLFgreC5oFCPGJyPg0KlmyCzZDmjI45MJacgq6C54KigrWCqYnSgrCCyIKpgsGCvYKvgseB\
QYLGguiCoIKmgriKeYK1gsSJ0oKwgumCwYLEgsyCvoKvgs0xMDAlitSI4YKigsiCooLFgreBSYFJ\
PGJyPg0KlpyCqojqgqCC3ILoidKCsILIgqmCwYK9gsaCtYLEguCWs5e/gsiC8YLFkbmCzYLcgsGC\
vYKtgrWCyIKigsWCt4LmgUmBSTxicj48YnI+DQoNCj4+PGEgaHJlZj0iaHR0cDovLzAwMy54emFq\
aWVybW5oLmNsaWNrL2wwYi93ZTh4My5waHA/MTI9dDB5NXpRa3dKUWtFNzBrRUwwbk04bUxHNzBQ\
MXowa3c4MWJiIj6T/Iz7PC9hPjxicj48YnI+DQoNCg0KDQoNCjxicj48YnI+DQoNCg0KDQo8YnI+\
PGJyPg0KPGJyPjxicj48YnI+PGJyPg0KDQoNCg0KPGJyPjxocj48YnI+DQoNCg0KDQoNCoGcPGEg\
aHJlZj0iaHR0cDovLzAwMy54emFqaWVybW5oLmNsaWNrL2wwYi93ZTh4My5waHA/MTI9dDB5NXpR\
a3dMbWlSN1FGZzgwckc4RWttSlFrRTcwa0UiPoNSg2ODUoNjk62CrYLMgqqUbo6tgueCtYKtgsiC\
wYK9lfuC1oFAgaaMwJLoMzCWvDwvYT48YnI+PGJyPg0KPGJyPg0KgZw8YSBocmVmPSJodHRwOi8v\
MDAzLnh6YWppZXJtbmguY2xpY2svbDBiL3dlOHgzLnBocD8xMj1MMFVOelFQUjgwbnA4MExHODBK\
TThNcDE4MHJjOE1wRXppYmIiPoN5g0GBW4NZguaC6IrIklCCyYOEg4yC6TwvYT48YnI+PGJyPg0K\
PGJyPg0KgZw8YSBocmVmPSJodHRwOi8vMDAzLnh6YWppZXJtbmguY2xpY2svbDBiL3dlOHgzLnBo\
cD8xMj1MbWt3OE1GbThNcHU4MDZOelFQUjgwbnA4MExHODBKM3ppYmIiPpG8jtCCxZJmgueC6oK9\
lfuCxYLgkeWP5JV2IIKyl1qOkZemOTWBk4LMjsCQ0YGZPC9hPjxicj48YnI+DQo8YnI+DQoNCpR6\
kE2S4o5+gs08YnI+PGEgaHJlZj0iaHR0cDovLzAwMy54emFqaWVybW5oLmNsaWNrL2wwYi94bGcu\
cGhwPzEyPUxta1I3UVBjejBpbXpNbnA4MExHODBKTnpRUFI4MGtiIj6CsYKxgvA8L2E+uNivuA0K\
PC9ib2R5Pg0KPC9odG1sPg==\
--=_0e3def0f2ade562a7a77a3dc406fce41--";
var a = new Buffer(b64, 'base64').toString('shift_jis');
console.log(a);
