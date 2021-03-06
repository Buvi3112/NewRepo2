USE [master]
GO
/****** Object:  Database [OnlineBanking]    Script Date: 06-09-2021 10:31:58 ******/
CREATE DATABASE [OnlineBanking]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'OnlineBanking', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\OnlineBanking.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'OnlineBanking_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\OnlineBanking_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [OnlineBanking] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [OnlineBanking].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [OnlineBanking] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [OnlineBanking] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [OnlineBanking] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [OnlineBanking] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [OnlineBanking] SET ARITHABORT OFF 
GO
ALTER DATABASE [OnlineBanking] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [OnlineBanking] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [OnlineBanking] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [OnlineBanking] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [OnlineBanking] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [OnlineBanking] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [OnlineBanking] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [OnlineBanking] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [OnlineBanking] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [OnlineBanking] SET  DISABLE_BROKER 
GO
ALTER DATABASE [OnlineBanking] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [OnlineBanking] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [OnlineBanking] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [OnlineBanking] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [OnlineBanking] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [OnlineBanking] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [OnlineBanking] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [OnlineBanking] SET RECOVERY FULL 
GO
ALTER DATABASE [OnlineBanking] SET  MULTI_USER 
GO
ALTER DATABASE [OnlineBanking] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [OnlineBanking] SET DB_CHAINING OFF 
GO
ALTER DATABASE [OnlineBanking] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [OnlineBanking] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [OnlineBanking] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [OnlineBanking] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'OnlineBanking', N'ON'
GO
ALTER DATABASE [OnlineBanking] SET QUERY_STORE = OFF
GO
USE [OnlineBanking]
GO
/****** Object:  Table [dbo].[AccountDetailsTable]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountDetailsTable](
	[AccNumber] [numeric](18, 0) NOT NULL,
	[FirstName] [varchar](max) NOT NULL,
	[LastName] [varchar](max) NOT NULL,
	[Address] [varchar](max) NOT NULL,
	[PhoneNumber] [varchar](max) NOT NULL,
	[Age] [int] NULL,
	[DOB] [date] NOT NULL,
	[CurrentBalance] [numeric](18, 0) NOT NULL,
	[Gender] [varchar](max) NULL,
	[AccountCreationDate] [date] NULL,
	[Freeze_UnFreeze] [varchar](max) NULL,
	[MaxTransactionLimitPerDay] [int] NULL,
 CONSTRAINT [PK_AccountDetails] PRIMARY KEY CLUSTERED 
(
	[AccNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[QueryTable]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[QueryTable](
	[TicketNumber] [numeric](18, 0) NOT NULL,
	[AccNumber] [numeric](18, 0) NOT NULL,
	[Query] [varchar](max) NULL,
	[Answer] [varchar](max) NULL,
	[GivenBy] [varchar](max) NULL,
	[Date] [date] NULL,
 CONSTRAINT [PK_QueryTable] PRIMARY KEY CLUSTERED 
(
	[TicketNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Role]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleId] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionHistoryTable]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionHistoryTable](
	[HistoryKey] [numeric](18, 0) NOT NULL,
	[Date] [date] NOT NULL,
	[AccNumber] [numeric](18, 0) NOT NULL,
	[DebitAmount] [numeric](18, 0) NULL,
	[CreditAmount] [numeric](18, 0) NULL,
	[Balance] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_TransactionHistoryTable] PRIMARY KEY CLUSTERED 
(
	[HistoryKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionsTable]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionsTable](
	[TransactionId] [numeric](18, 0) NOT NULL,
	[AccNumber] [numeric](18, 0) NOT NULL,
	[Date] [date] NOT NULL,
	[TransactionType] [varchar](max) NOT NULL,
	[FromAccNumber] [numeric](18, 0) NULL,
	[ToAccNumber] [numeric](18, 0) NULL,
	[FromName] [varchar](max) NULL,
	[ToName] [varchar](max) NULL,
	[Amount] [numeric](18, 0) NOT NULL,
	[Status] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Transactions] PRIMARY KEY CLUSTERED 
(
	[TransactionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](max) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserInRole]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserInRole](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [int] NOT NULL,
	[RoleId] [int] NOT NULL,
 CONSTRAINT [PK_UserInRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[User]  WITH CHECK ADD  CONSTRAINT [FK_User_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[User] CHECK CONSTRAINT [FK_User_Role]
GO
ALTER TABLE [dbo].[UserInRole]  WITH CHECK ADD  CONSTRAINT [FK_UserInRole_Role] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Role] ([RoleId])
GO
ALTER TABLE [dbo].[UserInRole] CHECK CONSTRAINT [FK_UserInRole_Role]
GO
ALTER TABLE [dbo].[UserInRole]  WITH CHECK ADD  CONSTRAINT [FK_UserInRole_User] FOREIGN KEY([UserId])
REFERENCES [dbo].[User] ([UserId])
GO
ALTER TABLE [dbo].[UserInRole] CHECK CONSTRAINT [FK_UserInRole_User]
GO
/****** Object:  StoredProcedure [dbo].[AccRandom]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[AccRandom](@unit int,@min int,@max int)
as 
Begin
	Declare @i int = 0
	Declare @number int
	while (@i<@unit)
	Begin
		Set @number = floor(rand()*(@max-@min+1))+@min
	end
	Select @number
End


GO
/****** Object:  StoredProcedure [dbo].[Conversion]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Conversion](@unit int)
as 
Begin
	Declare @number FLOAT
	Set @number = (Select CAST(@unit as float))
	Select @number
End



GO
/****** Object:  StoredProcedure [dbo].[Random]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[Random](@unit int,@min int,@max int)
as 
Begin
	Declare @i int = 0
	Declare @number float
	while (@i<@unit)
	Begin
		Set @number = floor(rand()*(@max-@min+1))+@min
	end
	Select @number
End
GO
/****** Object:  StoredProcedure [dbo].[TransRandom]    Script Date: 06-09-2021 10:31:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[TransRandom](@unit int,@min int,@max int)
as 
Begin
	Declare @numbers table(number int)
	Declare @i int = 0
	Declare @number int
	while (@i<@unit)
	Begin
		Set @number = floor(rand()*(@max-@min+1))+@min
		if(not exists(Select * from @numbers where number = @number))
		begin
			insert into @numbers values(@number)
			Set @i = @i + 1 
		end
	end
	Select * from @numbers order by 1
End
GO
USE [master]
GO
ALTER DATABASE [OnlineBanking] SET  READ_WRITE 
GO
