<?php

namespace Ark\Http\Controllers;

use Illuminate\Http\Request;

use Ark\Http\Requests;

class AngularController extends Controller
{
    //
    public function serveApp(){
        return view('index');
    }
    public function unsupported(){
        return view('unsupported');
    }
}
