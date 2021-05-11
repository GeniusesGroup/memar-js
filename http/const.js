/* For license and copyright information please see LEGAL file in repository */

/*
                ********************PAY ATTENTION:*******************
    We believe HTTP version 2 and above are new protocol not new version of HTTP!!
    So we don't support HTTP2 and HTTP3 specs in this package!!
*/

const
    // PacketLen is minimum Packet length of HTTP Packet.
    PacketLen = 64,

    // MaxHTTPHeaderSize is max HTTP header size.
    MaxHTTPHeaderSize = 8192,

    // TimeFormat is the time format to use when generating times in HTTP
    // headers. It is like time.RFC1123 but hard-codes GMT as the time
    // zone. The time being formatted must be in UTC for Format to
    // generate the correct format.
    TimeFormat = "Mon, 02 Jan 2006 15:04:05 GMT"

// Some default values
const
    DefaultUserAgent = "Achaemenid-Client",
    DefaultServer = "Achaemenid",

    SP = ' ',  // <US-ASCII SP, space (32)>
    HT = '	',  // <US-ASCII HT, horizontal-tab (9)>
    CR = '\r', // <US-ASCII CR, carriage return (13)>
    LF = '\n', // <US-ASCII LF, linefeed (10)>
    Colon = ':',
    NumberSign = '#',
    Coma = ',',
    Question = '?',
    Slash = '/',
    Asterisk = '*',
    CRLF = "\r\n",
    ColonSpace = ": ",
    SemiColonSpace = "; "

// Standard HTTP versions
const
    VersionHTTP1 = "HTTP/1.0",
    VersionHTTP11 = "HTTP/1.1",
    VersionHTTP2 = "HTTP/2.0",
    VersionHTTP3 = "HTTP/3.0"

// Standard HTTP methods
// https://tools.ietf.org/html/rfc7231#section-4
const
    MethodGET = "GET",
    MethodPOST = "POST",
    MethodHEAD = "HEAD",
    MethodPUT = "PUT",
    MethodDELETE = "DELETE",
    MethodOPTIONS = "OPTIONS",
    MethodCONNECT = "CONNECT",
    MethodTRACE = "TRACE",
    MethodPATCH = "PATCH" // https://tools.ietf.org/html/rfc5789#section-2


// Standard HTTP header keys
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
const
    // Request context
    HeaderKeyFrom = "From",
    HeaderKeyHost = "Host",
    HeaderKeyReferer = "Referer",
    HeaderKeyReferrerPolicy = "Referrer-Policy",
    HeaderKeyUserAgent = "User-Agent",

    // Response context
    HeaderKeyAllow = "Allow",
    HeaderKeyServer = "Server",
    HeaderKeyErrorID = "Error-ID"
