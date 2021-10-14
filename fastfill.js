(async function run() {
    const file = "Profile1";
    var el = document.querySelector('body');

    const response = await fetch('https://fastfill.netlify.app/index.html');
    const html = await response.text();
    el.insertAdjacentHTML("afterbegin", html);

    var fastfill = document.querySelector('#fastfill');
    fastfill.scrollIntoView({ block: "start", behavior: "smooth" });

    const urlParams = new URLSearchParams(window.location.search);
    const wipID = urlParams.get('wip');


    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    function getVisitorAndSessionIds() {
        const cookies = getCookiesMap();
        const sessionId = cookies.VisitDescriptor.split(':')[0];
        const visitorId = cookies['CTM.MVT'].split('&')[0].split('=')[1];

        return {
            sessionId,
            visitorId,
        };
    }

    function getCookiesMap() {
        return document.cookie.split('; ').reduce((prev, current) => {
            const [name, ...value] = current.split('=');
            prev[name] = value.join('=');

            return prev;
        }, {});
    }

    const visitorAndSessionIds = getVisitorAndSessionIds();
    const headers = {
        'ctm-session-id': visitorAndSessionIds.sessionId,
        'ctm-visitor-id': visitorAndSessionIds.visitorId,
        'ctm-correlation-id': uuidv4(),
        'ctm-causation-id': uuidv4(),
        'ctm-user-agent': 'fastfill',
        'Content-Type': 'application/json',
        Cookie: 'SameSite=strict',
    };

    document.getElementById('ffp-fill').addEventListener("click",async () => {
        await fetch(`https://gateway.comparethemarket.com/product/loans/version/5.0/capture/wip/${wipID}`,
            {
                method: 'PUT',
                headers,
                body: JSON.stringify({
                    "metadata":
                    {
                        "createdAt": "2021-10-14T12:00:30.5661101Z",
                        "modifiedAt": "2021-10-14T12:00:30.5661101Z",
                        "product": "Loans", "version": "5.0", 
                        "sessionId": visitorAndSessionIds.sessionId, 
                        "visitorId": visitorAndSessionIds.visitorId, 
                        "reason": "New", 
                        "referringCode": "EI32", 
                        "visitLogId": "6731908775294271488", 
                        "clientIp": "84.40.225.55", 
                        "ctmUserAgent": "product.journey-gateway/2.266.1 (https://gateway.comparethemarket.com/loans/5.0/build/continue?AFFCLIE=EI32&journey=&createdjourneygatewaycookie=1)", 
                        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36", "termsAndConditionsAccepted": true, "prepopulated": [], "defaulted": [{ "key": "Metadata.termsAndConditionsAccepted", "value": "True" }], "autoModified": [], "featureToggles": [{ "key": "loanType", "value": "P" }], "prefilled": [], "communicationsPreferences": { "email": false, "telephone": false, "sms": false, "post": false }, "emailAddress": "ff@emailreaction.com", "outbounding": false, "enquirySubject": "2021-10-14T12:15:19.329Z", "termsAndConditionsUri": "https://www.comparethemarket.com/information/terms-and-conditions/"
                    }, "features": [{ "code": "loanType", "value": "P" }],
                     "risk": { "amount": 1000, "term": 13, "title": { "dataCode": "MR", "displayText": "Mr" }, "firstName": "dsfga", "lastName": "sdfg", "depositAmount": 1021, "emailAddress": "ff@emailreaction.com", "annualIncomeGross": 4567, "purpose": { "dataCode": "C", "displayText": "Buying a Car" }, "residentialStatus": { "dataCode": "HOWM", "displayText": "Homeowner with mortgage" }, "employmentStatus": { "dataCode": "H", "displayText": "House Person" }, "dateOfBirth": "1995-03-15", "currentAddress": { "completeAddress": { "postOfficeAddress": { "organisationName": "B G L Group Ltd", "department": "", "subBuilding": "", "building": "", "number": "1", "dependentThoroughfare": "B G L Park", "thoroughfare": "Bakewell Road", "doubleDependentLocality": "", "dependentLocality": "Orton Southgate", "town": "Peterborough", "postalCounty": "", "postcode": "PE2 6XJ", "abbreviatedPostalCounty": "", "optionalCounty": "Cambridgeshire", "abbreviatedOptionalCounty": "Cambs", "traditionalCounty": "", "administrativeCounty": "Peterborough", "dps": "1A" }, "formattedAddress": { "line1": "B G L Group Ltd", "line2": "1 B G L Park", "line3": "Bakewell Road", "line4": "Orton Southgate", "line5": "Peterborough", "postcode": "PE2 6XJ" } }, "whenMovedDate": "2018-03-01" }, "dependents": 0, "childCarePaymentsMonthly": 0, "accommodationExpenditureMonthly": 543 }
                }),
            })
            
        document.location.reload();
        window.open(`https://gateway.comparethemarket.com/loans/5.0/viewprices/wip/${wipID}?journey=https://loans-eligibility-enquiry.comparethemarket.com`,"_self")
    })
})();