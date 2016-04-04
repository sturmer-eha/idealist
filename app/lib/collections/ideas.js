Ideas = new Mongo.Collection("ideas");
/*
  - _id: unique ID [string]
  - name: given name [string]
  - timestamp: time of creation [date]
  - score: total voting score [int]
  - voters: list of userID's who have voted for this idea (+1 or 0) [array]
  - sessionId: _id of the parent session (undefined if current) [string]
*/
