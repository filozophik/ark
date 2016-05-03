<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
    <title>Arch & Sun Designs</title>
    <link rel="shortcut icon" href="/images/logo.png">
    <title>Title</title>
    <link type="text/css"
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>
<div class="col-xs-12 col-lg-offset-2 col-lg-8 container">
    <h3>List of Products</h3><hr>
    <table class="table">
        <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Action</th>
        </tr>
        <tbody></tbody>
    </table>
</div>
<script src="https://code.jquery.com/jquery-2.2.3.min.js" integrity="sha256-a23g1Nt4dtEYOj7bR+vTu7+T8VP13humZFBJNIYoEJo=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript">
    $.getJSON('/api/v1/products', function(data) {
        console.log(data);
        var table = $('.table tbody');
        $.each(data,function() {
          table.append("<tr>" +
                  "<td><img style='max-height:100px' src='/products/" + this.gender + "/" + this.pictures[0] + "'></td>" +
                "<td>" + this.description + "</td>" +
                "<td><a href='/admin/products-single/"+this.id+"'>Edit</a>");
        });

    });
</script>
</body>
</html>