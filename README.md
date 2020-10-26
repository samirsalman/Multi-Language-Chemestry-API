# Multi-language Chemestry API
 
## API Functionalities

With Multi-language Chemistry API v1.0 you can:

- Get all periodic table elements with their characteristics
- Filter periodic table elements by name, periodic Group and id
- Get all compounds in 5 different languages
- Filter compounds by molar mass or id


## Usage

You can access to Multi-language Chemistry API from: ```chemistry-api-salman.herokuapp.com/```

There are two different end-points:

### Periodic Table Elements End-Point

Periodic Table Elemements End-Point: ```/periodicTable```
Query parameters are:
- state [Standard state of the elements: gas, solid or liquid] 
- name [Element name]
- group [group of the elements like metal ecc...)

You can find all periodic table elements at this endpoint: ```/periodicTable/all```

You can also find periodic table elements by their id at this endpoint: ```/periodicTable/byId```
with Query parameter:
- id [Id of element]

### Response Example

```
[
{
"atomicNumber": 1,
"symbol": "H",
"name": "Hydrogen",
"atomicMass": "1.00794(4)",
"cpkHexColor": "FFFFFF",
"electronicConfiguration": "1s1",
"electronegativity": 2.2,
"atomicRadius": 37,
"ionRadius": "",
"vanDerWaalsRadius": 120,
"ionizationEnergy": 1312,
"electronAffinity": -73,
"oxidationStates": "-1, 1",
"standardState": "gas",
"bondingType": "diatomic",
"meltingPoint": 14,
"boilingPoint": 20,
"density": 0.0000899,
"groupBlock": "nonmetal",
"yearDiscovered": 1766
}
]
```



### Multi-language Compounds End-Point

Multi-language Compounds End-Point: ```/compounds```

Query parameters are:
- lang [**REQUIRED** select response language]
- min [min atomic mass]
- max [max atomic mass]

You can find all compounds at this endpoint: ```/compounds/all```

You can also find compounds by their id at this endpoint: ```/compounds/byId```
with Query parameter:
- id [Id of element]


### Response Example
```
[
{
"no": 1,
"name": "Acetaldeide",
"formula": "C2H4O",
"molarMass": 44.053,
"density": "0-30%",
"rangeOfConcentration": "18°C"
},
{
"no": 2,
"name": "Acetammide",
"formula": "C2H5NO",
"molarMass": 59.068,
"density": "0-6%",
"rangeOfConcentration": "15°C"
}
]
```

## Author 

Samir Salman
