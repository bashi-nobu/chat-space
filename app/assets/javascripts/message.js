$(function(){
  function buildHTML(message) {
    var img = message.image ? `<img class="lower-message__image" src=${ message.image }>`: "";
    var html = `<div class="message">
                  <div class="message__upper" data-message-id="${message.id}">
                    <div class="message__upper__name">
                      ${ message.user_name}
                    </div>
                    <div class="message__upper__date">
                      ${ message.created_at}
                    </div>
                    <div class="message__lowwer">
                      <p>${ message.content}</p>
                        ${img}
                    </div>
                  </div>
                </div>`;
    return html;
  }
  function scrollBottom(){  //メッセージの最下部へ自動スクロールする関数
    var position = $(".chat__main")[0].scrollHeight;
    $('.chat__main').animate({scrollTop: position}, 500);
  }
  //イベント 発火設定
  $('#message_form').on('submit', function(e){
    e.preventDefault();//本来のsubmit処理をリセット
    var formData = new FormData(this);  //フォームに入力された内容を取得
    var url = $(this).attr('action');
    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //ajax処理が成功した場合の処理
    .done(function(message) {
      var html = buildHTML(message);
      $('.chat__main').append(html);  //入力された値を HTML反映
      $('#message_form')[0].reset();  //入力された値をリセット
      $('.form__submit-button').prop('disabled', false);  //submit処理を有効化
      scrollBottom(); //自動スクロール
    })
    //ajax処理が失敗した場合の処理
    .fail(function() {
      alert('メッセージの送信に失敗しました');
    })
  });

  //自動更新処理
  var interval = setInterval(function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      //チャットグループの最新のメッセージのidを取得
      var last_message_id = $(".message__upper:last").attr("data-message-id");
      $.ajax({
        type: "GET",
        url: location.href,
        dataType: 'json',
        data: {id: last_message_id},
      })
      //ajax処理が成功した場合の処理
      .done(function(message_list){
        message_list.forEach(function(message){
          var html = buildHTML(message);
          $('.chat__main').append(html);  //入力された値を HTML反映
        });
        scrollBottom(); //自動スクロール
      })
      //ajax処理が失敗した場合の処理
      .fail(function() {
        alert('メッセージの自動更新に失敗しました');
      });
    }else{
    clearInterval(interval);
  }}, 3*1000);
});
