/* For license and copyright information please see LEGAL file in repository */

const IP = {
    base64: {},
}

IP.String = function (ip) {
    let IPString = ""
    if (ip[0] === 0 && ip[1] === 0 && ip[2] === 0 && ip[3] === 0 && ip[4] === 0 && ip[5] === 0 && ip[6] === 0 && ip[7] === 0 && ip[8] === 0) {
        // IPv4
        IPString += ip[12]
        IPString += "."
        IPString += ip[13]
        IPString += "."
        IPString += ip[14]
        IPString += "."
        IPString += ip[15]
    } else if (ip[4] === 0 && ip[5] === 0 && ip[6] === 0 && ip[7] === 0 && ip[8] === 0 && ip[9] === 0 && ip[10] === 0 && ip[11] === 0 && ip[12] === 0 && ip[13] === 0 && ip[14] === 0 && ip[15] === 0) {
        // IPv4
        IPString += ip[0]
        IPString += "."
        IPString += ip[1]
        IPString += "."
        IPString += ip[2]
        IPString += "."
        IPString += ip[3]
    } else if (ip[4] === 0 && ip[5] === 0 && ip[6] === 0 && ip[3] === 0 && ip[4] === 0 && ip[5] === 0 && ip[6] === 0 && ip[7] === 0 && ip[8] === 0 && ip[9] === 0) {
        // IPv6
        // for (let i = 0; i < 16; i += 2) {
        //     if i == e0 {
        //         b = append(b, ':', ':')
        //         i = e1
        //         if i >= IPv6len {
        //             break
        //         }
        //     } else if i > 0 {
        //         b = append(b, ':')
        //     }
        //     b = appendHex(b, (uint32(p[i])<<8)|uint32(p[i+1]))
        // }
    }
    return IPString
}

IP.base64.Encode = function (ip) {
    return base64.stdWithoutPadding.Encode(ip)
}

IP.base64.Decode = function (base64) {
    const byteCharacters = atob(base64)
    const ip = new Array(16)
    for (let i = 0; i < 16; i++) {
        ip[i] = byteCharacters.charCodeAt(i)
    }
    return ip
}

IP.base64.String = function (base64) {
    const ip = IP.base64.Decode(base64)
    const IPString = IP.String(ip)
    return IPString
}
