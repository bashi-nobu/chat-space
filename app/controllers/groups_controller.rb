class GroupsController < ApplicationController
  def index
  end

  def new  #グループ作成画面
    #ユーザーネームを取得
    @group = Group.new
    @group.users << current_user
  end

  def create  #グループ作成処理
    @group = Group.create(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @group = Group.find(params[:id])
    @group_users = @group.users
  end

  def update
    @group = Group.find(params[:id])
    if @group.update(group_params)
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, { user_ids: []})
  end
end
