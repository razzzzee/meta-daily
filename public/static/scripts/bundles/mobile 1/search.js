const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('q');

let searchResultTemplate = document.getElementById("searchResultTemplate").innerHTML;
let searchResultTemplateFunc = Handlebars.compile(searchResultTemplate);

$.getJSON("/searchresultdata?searchParam=" + myParam, function (data) {
    if (data.length > 1) {
        $.each(data, function (key, val) {
            if (val.ContentId != null) {
                let searchResult = {
                    PostPath: val.PostPath,
                    ContentType: val.ContentType,
                    ContentImagePathTag: val.ContentImagePathTag,
                    Source: val.SourceName,
                    ContentTitle: val.ContentTitle,
                    ContentPostedDate: val.ContentPostedDate,
                    InPath: val.InPath,
                    In: val.In,
                    Location: val.Location,
                    CoverImagePath: val.CoverImagePath
                };
                let searchResultObj = searchResultTemplateFunc(searchResult);
                $("#MainContent").append(searchResultObj);
            }
        });
    }
    else{
        $("#MainContent").append('<p style="font-size:35px; font-weight:700; margin-left:50px; margin-top:10px;">No Result Found for {'+myParam+'}</p>');
    }
});
