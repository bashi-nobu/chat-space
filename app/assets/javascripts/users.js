$(function() {

  function buildHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${ user.name}">追加</a>
                </div>`;
    return html;
  }

  function build_chatmember_HTML(user_id,user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='`+user_id+`' class="chat_member_id">
                  <p class='chat-group-user__name'>`+user_name+`</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    return html;
  }

  //インクリメンタルサーチ処理
  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();//本来のsubmit処理をリセット
    //フォームに入力された内容を取得
    var inputData = $(this).val();
    //ajax処理
    $.ajax({
      type: "GET",
      url: '/users',
      data: {
        search_name: inputData
      },
      dataType: 'json',
    })
    //ajax処理が成功した場合の処理
    .done(function(data_list) {
      //既存の検索結果をクリアにする
      $('#user-search-result').empty();
      //チャットメンバー欄に記載されているユーザーのidを取得し配列に保存
      var chat_member_list = [];
      $("#chat-group-users").find('.chat_member_id').each( function( index, element ) {
        chat_member_list.push(element.value);
      });
      //jsonで返されたユーザーデータをHTMLに反映(チャットメンバー欄に記載されているユーザーは除外)
      data_list.forEach(function(user){
        if(chat_member_list.indexOf(String(user.id)) == -1){
          html = buildHTML(user);
          $('#user-search-result').append(html);
        }
      });
    })
    //ajax処理が失敗した場合の処理
    .fail(function() {
      alert('error');
    })
  });

  //追加ボタンを押された際の処理
  $(document).on("click", ".user-search-add", function (e) {
    var user_id = $(this).attr('data-user-id');   //追加ボタンを押されたユーザーのidを取得
    var user_name = $(this).attr('data-user-name');  //追加ボタンを押されたユーザのnameを取得
    //追加ボタンを押されたユーザーをチャットメンバー欄に追加
    var html = build_chatmember_HTML(user_id,user_name);
    $('#chat-group-users').append(html);
    //検索候補欄から追加ボタンを押されたユーザーを除外
    $(this).parent().remove();
  });

  //削除ボタンを押された際の処理
  $(document).on("click", ".chat-group-user__btn--remove", function (e) {
    //削除ボタンを押されたユーザーを除去
    $(this).parent().remove();
  });
});
