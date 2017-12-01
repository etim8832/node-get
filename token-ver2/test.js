var header = {
   
    alg:HS256
 };

 var payload = {
    'iss': 'konoe',
    'aud': 'everyone',
    'exp': 1460046010,
    'name': 'Narupon Srisantitham'
 }

 var encoded = base64Encode(header) + '.' + base64Encode(payload);
 var signature = HMACSHA256(encoded);

 var jwt_token = encoded + '.' + signature;

 var split = jwt_token.split('.');
 var header = base64Decode(split[0]);
 var payload = base64Decode(split[1]);
 var signature= base64Decode(split[2]);
 if(header.alg == 'HS256'){
    var new_signature = HMACSHA256(split[0] + '.' + split[1]);
    if(signature == new_signature){
       //Do something
    }
 }