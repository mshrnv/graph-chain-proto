# Graph-Chain v1.0.0

Graph-Chain API
___
# Graph

## Get one graph

<p>Get graph data by graph _id</p>

```
GET /graph
```

### Parameters - `Request Query Parameters`

| Name | Type       | Description       |
|------|------------|-------------------|
| graph_id | `String` | <p>Graph _id from Mongo</p> |

## Get all graphs

<p>Get list of all graphs</p>

```
GET /graphs
```

## Create new graph

<p>Create new Graph</p>

```
POST /graph
```

### Parameters - `Request Body Parameters`

| Name | Type       | Description                     |
|------|------------|---------------------------------|
| name | `String` | <p>Graph name</p>               |
| data | `String` | <p>Graph data (JSON string)</p> |

## Update graph

<p>Update Graph</p>

```
PUT /graph
```

### Parameters - `Request Body Parameters`

| Name | Type       | Description                             |
|------|------------|-----------------------------------------|
| _id  | `String` | <p>Graph _id from MongoDB</p>           |
| data | `String` | <p>Updated graph data (JSON string)</p> |

