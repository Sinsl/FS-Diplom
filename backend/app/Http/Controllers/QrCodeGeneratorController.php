<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\Ticket;
use URL;

class QrCodeGeneratorController extends Controller
{
    public function generate(Request $request) {

        $id = $request->query('id');
        
        $url_str = '/qrcode/qrc-' . $id  . '.svg';
        QrCode::size(200)->generate(URL::to("/") . '/api/qrc/ticket/' . $id, '../public' . $url_str);

        $ticket = Ticket::find($id);
        $ticket->qrcode_url = $url_str;
        $ticket->save();

        return response()->json(['id' => $id]);   
    }
}
