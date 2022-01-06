using System;

namespace SE.Domain.Exceptions;

public class RegisterException : Exception
{
    private RegisterException() : base("Error occured while registering user.") { }
    public static RegisterException Instance { get; } = new();
}