class MessagesController < ApplicationController
  before_action :set_group

  def index
    @group = Group.find(params[:group_id])
    @message = Message.new
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def create
    @message = @group.messages.new(message_params)
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'}
        format.json  #jbuilder 'アクション名'.json.jbuilder というファイル内にjsonデータの定義をしておけば その形式に沿って jsonデータが返される
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:content,:image).merge(user_id: current_user.id, group_id: @group.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
